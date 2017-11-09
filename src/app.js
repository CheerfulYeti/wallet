import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import store from 'reduxConfig/store';
import Routes from 'router';

const history = createBrowserHistory();

export default () => (
  <MuiThemeProvider>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>
);