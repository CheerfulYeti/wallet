import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Tabs, Tab } from 'material-ui/Tabs';
import Auth from 'containers/Login/Auth';
import Registration from 'containers/Login/Registration';

// Styles
import { AppContainer } from './styled';

const mapStateToProps = function (store) {
  return {

  };
};

class App extends Component {

  render() {
    const { history } = this.props;
    return (
      <AppContainer>
        <TabsComponent history={history} />
      </AppContainer>
    )
  };
}

const TabsComponent = (props) => (
  <Tabs>
    <Tab label="Login" >
      <Auth history={props.history}/>
    </Tab>
    <Tab label="Registration" >
      <Registration history={props.history}/>
    </Tab>
  </Tabs>
);

export default connect(mapStateToProps)(App);