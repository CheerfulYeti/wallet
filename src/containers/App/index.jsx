import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTest } from 'reduxConfig/actions/app';
import { getLatestRates } from 'reduxConfig/actions/currency';
import { Tabs, Tab } from 'material-ui/Tabs';
import Auth from 'containers/Login/Auth';
import Registration from 'containers/Login/Registration';
import ApiResponse from 'components/ApiResponse';

// Styles
import { AppContainer } from './styled';
import Button from 'components/Button';

const mapStateToProps = function (store) {
  return {

  };
};

class App extends Component {

  render() {
    return (
      <AppContainer>
        <TabsExampleSimple />
      </AppContainer>
    )
  };

}

const TabsExampleSimple = () => (
  <Tabs>
    <Tab label="Login" >
      <Auth />
    </Tab>
    <Tab label="Registration" >
      <Registration />
    </Tab>
  </Tabs>
);

export default connect(mapStateToProps)(App);