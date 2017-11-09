import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import app from './app';
import keys from './keys';

export default combineReducers({
  app,
  form,
  keys,
});