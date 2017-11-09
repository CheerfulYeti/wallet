import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import App from './App';
import Currency from './Currency';
import User from './User';

export default combineReducers({
  appState: App,
  currencyState: Currency,
  userState: User,
  form: formReducer,
});