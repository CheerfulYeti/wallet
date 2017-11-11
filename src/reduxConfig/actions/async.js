import {createAction} from 'redux-actions';
import api from 'api/api.js';
import actionTypes from '../constants/actionTypes';

export const methodList = {
  account: {
    register: 'account.register',
  },
};

const async = {
  request: createAction(actionTypes.async.request, (method, data) => {
    return Promise.resolve({
      payload: {
        method,
        data,
      }
    });
  }),
  success: createAction(actionTypes.async.success, (method, data) => {
    return Promise.resolve({
      payload: {
        method,
        data,
      }
    });
  }),
  fail: createAction(actionTypes.async.fail, (method, data) => {
    return Promise.resolve({
      payload: {
        method,
        data,
      }
    });
  }),
};

export const load = (method, params) => (dispatch) => {
  dispatch(async.request(method, params));
  
  api(method, params)
    .then(response => {
      console.log("point-1510393588808", response);
      dispatch(async.success(method, JSON.parse(response.responseData)));
    })
    .catch(error => {
      dispatch(async.fail(method, error));
      
    });
};