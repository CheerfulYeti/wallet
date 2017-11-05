import {combineReducers} from 'redux';

import App from './App';
import Currency from './Currency';

export default combineReducers({
  appState: App,
  currencyState: Currency,
});