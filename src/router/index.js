import React from 'react';
import { Route, Switch } from 'react-router';

import routeList from './routeList';
import componentList from './componentList';

import Auth from 'containers/Login/Auth';

export default () => (
  <Switch>
    <Route exact path={routeList.home} component={componentList.home} />
    <Route exact path={routeList.loginAuth} component={Auth} />
    <Route exact path={'/'} component={Auth} />
    <Route exact path={routeList.loginRegistration} component={componentList.loginRegistration} />
  </Switch>
);
