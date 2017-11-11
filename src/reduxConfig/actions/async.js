import {createAction} from 'redux-actions';
import api from 'api/api.js';
import { AsyncState } from 'objects/AsyncState';
import { errorCodes, errorMessages } from 'constants/errors';
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

export const reset = (method) => (dispatch) => {
  dispatch(actions.reset({
    method,
  }));
};

export const load = (method, params) => (dispatch) => {
  dispatch(actions.request({
    method,
    data: params,
  }));
  api(method, params)
    .then(response => {
      dispatch(actions.success({
        method,
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
        method,
        data: {
          message,
          code,
        },
      }));
      
    });
};

export const getStoreState = (state, method, defaultLoader) => {
  if (!state.async[method]) {
    return new AsyncState(defaultLoader);
  }
  return state.async[method];
};

export default {
  load,
  methodList,
  getStoreState,
  actions,
};