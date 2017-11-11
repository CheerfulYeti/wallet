import {createAction} from 'redux-actions';
import api from 'api/api.js';
import actionTypes from '../constants/actionTypes';
import { AsyncState } from 'objects/AsyncState';

export const methodList = {
  account: {
    register: 'account.register',
    getInfo: 'account.getInfo',
  },
};

const async = {
  request: createAction(actionTypes.async.request),
  success: createAction(actionTypes.async.success),
  fail: createAction(actionTypes.async.fail),
};

export const load = (method, params) => (dispatch) => {
  dispatch(async.request({
    method,
    data: params,
  }));
  console.log("%cP-1510399736385", 'background: #222; color: #bada55', method);
  console.log("%cP-1510399738463", 'background: #222; color: #bada55', params);
  api(method, params)
    .then(response => {
      dispatch(async.success({
        method,
        data: response,
      }));
    })
    .catch(error => {
      dispatch(async.fail({
        method,
        data: error,
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
};