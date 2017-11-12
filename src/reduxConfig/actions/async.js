import { createAction } from 'redux-actions';
import api from 'api/api.js';
import { AsyncState } from 'objects/AsyncState';
import { errorCodes, errorMessages } from 'constants/errors';
import { getImportedKeys, sign, base64Encode } from 'helpers/crypto';
import store from 'reduxConfig/store';
import get from 'lodash/get';
import resources, { method } from 'api/resources';
import actionTypes from '../constants/actionTypes';

export const methodList = {
  account: {
    register: 'account.register',
    getInfo: 'account.getInfo',
  },
  event: {
    add: 'event.add',
  },
};

const actions = {
  request: createAction(actionTypes.async.request),
  success: createAction(actionTypes.async.success),
  fail: createAction(actionTypes.async.fail),
};

export const reset = (resource) => (dispatch) => {
  dispatch(actions.reset({
    method: resource,
  }));
};

export const load = (resource, params) => (dispatch) => {
  dispatch(actions.request({
    method: resource,
    data: params,
  }));
  
  const resourceConfig = get(resources, resource);
  if (resourceConfig && resourceConfig.method === method.post) {
    makePOSTRequest(resource, params, dispatch);
  } else {
    makeRequest(resource, params, dispatch);
  }
};

function makeRequest(resource, params, dispatch) {
  api(resource, params)
    .then(response => {
      dispatch(actions.success({
        method: resource,
        data: response,
      }));
    })
    .catch(response => {
      const data = response.data();
      let code = errorCodes.UNEXPECTED_ERROR;
      let message = errorMessages.UNEXPECTED_ERROR;
      if (data.status) {
        code = data.status;
      } else {
        console.error(response);
      }
      if (data.error && data.error.message) {
        message = data.error.message;
      }
      dispatch(actions.fail({
        method: resource,
        data: {
          message,
          code,
        },
      }));
    });
}


function getKeysFromState() {
  const { privateKey, publicKey } = store.getState().user;
  return {
    privateKey,
    publicKey,
  };
}

function makePOSTRequest(resource, params, dispatch) {
  let { privateKey, publicKey } = params;
  delete params.privateKey;
  delete params.publicKey;
  
  let headers = {};
  headers['Content-Type'] = 'application/json';
  
  if (!publicKey) {
    publicKey = getKeysFromState().publicKey;
  }
  headers['X-Public-Key'] = base64Encode(publicKey);

  if (!privateKey) {
    privateKey = getKeysFromState().privateKey;
  }
  getImportedKeys(privateKey).then((keys) => {
    sign(keys, params).then(signature => {

      headers['X-Signature'] = signature;

      params.headers = headers;
      
      makeRequest(resource, params, dispatch)
    });
  });
}

export const getStoreState = (state, resource, defaultLoader) => {
  if (!state.async[resource]) {
    return new AsyncState(defaultLoader);
  }
  return state.async[resource];
};

export default {
  load,
  methodList,
  getStoreState,
  actions,
};