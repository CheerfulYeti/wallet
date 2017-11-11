export default {
  app: {
    setTest: 'APP/SET_TEST',
  },
  keys: {
    setIsFileGenerated: 'KEYS/SET_IS_FILE_GENERATED',
  },
  currency: {
    async: {
      getLatestRatesRequest: 'CURRENCY/ASYNC/GET_LATEST_RATES_REQUEST',
      getLatestRatesSuccess: 'CURRENCY/ASYNC/GET_LATEST_RATES_SUCCESS',
      getLatestRatesFail: 'CURRENCY/ASYNC/GET_LATEST_RATES_FAIL',
    }
  },
  user: {
    setKeys: 'USER/SET_KEYS',
  },
  
  async: {
    account: {
      register: {
        request: 'ASYNC_ACCOUNT_REGISTER_REQUEST',
        success: 'ASYNC_ACCOUNT_REGISTER_SUCCESS',
        fail: 'ASYNC_ACCOUNT_REGISTER_FAIL',
      },
    }
  },
}