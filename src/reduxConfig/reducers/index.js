import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import App from './App';
import Currency from './Currency';

export default combineReducers({
  appState: App,
  currencyState: Currency,
  form: formReducer,
});