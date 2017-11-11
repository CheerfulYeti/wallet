import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import app from './app';
import keys from './keys';
import user from './user';

export default combineReducers({
  app,
  form,
  keys,
  user,
});