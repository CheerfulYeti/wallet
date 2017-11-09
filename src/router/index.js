import React from 'react';
import { Route, Switch } from 'react-router';

import routeList from './routeList';
import componentList from './componentList';

export default () => (
  <Switch>
    <Route exact strict={false} path={routeList.home} component={componentList.home} />
    <Route exact strict={false} path={routeList.loginAuth} component={componentList.loginAuth} />
    <Route exact strict={false} path={routeList.loginRegistration} component={componentList.loginRegistration} />
    <Route exact strict={false} path={routeList.test} component={componentList.test} />
    <Route exact strict={false} path={routeList.profile} component={componentList.profile} />
  </Switch>
);
