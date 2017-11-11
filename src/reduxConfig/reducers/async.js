import { handleActions } from 'redux-actions';
import immutable from 'seamless-immutable';
import actionTypes from '../constants/actionTypes';

import {
  AsyncState,
  prepareStateRequest,
  prepareStateSuccess,
  prepareStateFail
} from 'objects/AsyncState';

const initialState = immutable.from({});

export default handleActions({
  [actionTypes.async.request]: (state, action) => {
    console.log("point-1510396493644", action.payload);
    const { method, data } = action.payload;
    const asyncState = state[method] ? state[method] : new AsyncState();
    return immutable.merge(state, {
      [method]: prepareStateRequest(asyncState, data),
    }, { deep: true, });
  },
  [actionTypes.async.success]: (state, action) => {
    const { method, data } = action.payload;
    return immutable.merge(state, {
      [method]: prepareStateSuccess(state[method], data),
    }, { deep: true, });
  },
  [actionTypes.async.fail]: (state, action) => {
    const { method, data } = action.payload;
    return immutable.merge(state, {
      [method]: prepareStateFail(state[method], data),
    }, { deep: true, });
  },
}, initialState);