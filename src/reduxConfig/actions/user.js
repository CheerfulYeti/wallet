import {createAction} from 'redux-actions';
import api from 'api/api.js';
import actionTypes from '../constants/actionTypes';

export const setKeys = createAction(actionTypes.user.setKeys);

export const accountRegister = (params) => (dispatch) => {
  const async = {
    request: createAction(actionTypes.async.account.register.request),
    success: createAction(actionTypes.async.account.register.success),
    fail: createAction(actionTypes.async.account.register.fail),
  };
  
  dispatch(async.request());
  
  api('account.register', params)
    .then(response => {
      dispatch(async.success(JSON.parse(response.responseData)));
    })
    .catch(error => {
      dispatch(async.fail(error));
      
    });
};