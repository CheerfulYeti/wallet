import {handleActions} from 'redux-actions';
import immutable from 'seamless-immutable';
import actionTypes from '../constants/actionTypes';

const initialState = immutable.from({
  privateKey: null,
  publicKey: null,
  publicHash: null,
});

export default handleActions({
  [actionTypes.user.setKeys]: (state, action) => {
    return immutable(state).merge({
      privateKey: action.payload.privateKey,
      publicKey: action.payload.publicKey,
      publicHash: action.payload.publicHash,
    }, { deep: true });
  },

}, initialState);