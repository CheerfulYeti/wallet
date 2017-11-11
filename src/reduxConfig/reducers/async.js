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

const getNewState = (state, action, prepareMethod) => {
  const { method, data } = action.payload;
  const asyncState = state[method] ? state[method] : new AsyncState();
  return immutable.merge(state, {
    [method]: prepareMethod(asyncState, data),
  }, { deep: true, });
};

export default handleActions({
  [actionTypes.async.request]: (state, action) => (
    getNewState(state, action, prepareStateRequest)
  ),
  [actionTypes.async.success]: (state, action) => (
    getNewState(state, action, prepareStateSuccess)
  ),
  [actionTypes.async.fail]: (state, action) => (
    getNewState(state, action, prepareStateFail)
  ),
  [actionTypes.async.reset]: (state, action) => (
    getNewState(state, action, new AsyncState())
  ),
}, initialState);