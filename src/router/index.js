import React from 'react';
import { Route, Switch } from 'react-router';

import routeList from './routeList';
import componentList from './componentList';

export default () => (
  <Switch>
    <Route exact path={routeList.home} component={componentList.home} />
    <Route exact path={routeList.loginAuth} component={componentList.loginAuth} />
    <Route exact path={routeList.loginRegistration} component={componentList.loginRegistration} />
  </Switch>
);
