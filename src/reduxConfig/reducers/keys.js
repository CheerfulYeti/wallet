import { handleActions } from 'redux-actions';
import immutable from 'seamless-immutable';
import ActionTypes from '../constants/actionTypes';

const initialState = immutable.from({
  isFileGenerated: false
});

export default handleActions({
  [ActionTypes.keys.setIsFileGenerated]: (state, action) => immutable.set(
    state,
    'isFileGenerated',
    action.payload
  ),

}, initialState);