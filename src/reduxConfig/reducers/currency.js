import { handleActions } from 'redux-actions';
import immutable from 'seamless-immutable';
import ActionTypes from '../constants/actionTypes';
import {
  AsyncState,
  prepareStateRequest,
  prepareStateSuccess,
  prepareStateFail
} from 'objects/AsyncState';

const initialState = immutable.from({
  async: {
    getLatestRates: new AsyncState()
  }
});

export default handleActions({
  [ActionTypes.currency.async.getLatestRatesRequest]: state => immutable.merge(state, {
    async: {
      getLatestRates: prepareStateRequest(state.async.getLatestRates)
    }
  }),
  [ActionTypes.currency.async.getLatestRatesSuccess]: (state, action) => immutable.merge(state, {
    async: {
      getLatestRates: prepareStateSuccess(state.async.getLatestRates, action.payload)
    }
  }),
  [ActionTypes.currency.async.getLatestRatesFail]: (state, action) => immutable.merge(state, {
    async: {
      getLatestRates: prepareStateFail(state.async.getLatestRates, action.payload)
    }
  }),

}, initialState);