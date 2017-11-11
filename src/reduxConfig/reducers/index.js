import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import app from './app';
import keys from './keys';
import user from './user';
import async from './async';

export default combineReducers({
  app,
  form,
  keys,
  user,
  async,
});