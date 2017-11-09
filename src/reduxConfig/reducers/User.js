import {handleActions} from 'redux-actions';
import immutable from 'seamless-immutable';
import ActionTypes from '../constants/ActionTypes';

const initialState = immutable.from({
  privateKey: null,
  publicKey: null,
});

export default handleActions({
  [ActionTypes.User.setKeys]: (state, action) => {
    return immutable(state).merge({
      privateKey: action.payload.privateKey,
      publicKey: action.payload.publicKey,
    }, { deep: true });
  },

}, initialState);