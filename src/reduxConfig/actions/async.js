import {createAction} from 'redux-actions';
import api from 'api/api.js';
import actionTypes from '../constants/actionTypes';

export const methodList = {
  account: {
    register: 'account.register',
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