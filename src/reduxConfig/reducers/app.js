import { handleActions } from 'redux-actions';
import immutable from 'seamless-immutable';
import ActionTypes from '../constants/actionTypes';

const initialState = immutable.from({
  test: false
});

export default handleActions({
  [ActionTypes.app.setTest]: (state, action) => immutable.set(state, 'test', action.payload),

}, initialState);