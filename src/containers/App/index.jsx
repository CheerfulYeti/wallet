import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTest } from 'reduxConfig/actions/app';
import { getLatestRates } from 'reduxConfig/actions/currency';
import { Tabs, Tab } from 'material-ui/Tabs';
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
        <h2>Wallet app</h2>

      </AppContainer>
    )
  };

  handleClick(value) {
    // set some state in the reduxConfig store
    this.props.dispatch(setTest(value));
    // make an API request
    this.loadLatestRates();
  };

  loadLatestRates() {
    this.props.dispatch(getLatestRates());
  };
}

const TabsExampleSimple = () => (
  <Tabs>
    <Tab label="Item One" >
      <div>
        <h2>Tab One</h2>
        <p>
          This is an example tab.
        </p>
        <p>
          You can put any sort of HTML or react component in here. It even keeps the component state!
        </p>
      </div>
    </Tab>
    <Tab label="Item Two" >
      <div>
        <h2>Tab Two</h2>
        <p>
          This is another example tab.
        </p>
      </div>
    </Tab>
    <Tab
      label="onActive"
      data-route="/home"
      onActive={() => false}
    >
      <div>
        <h2 >Tab Three</h2>
        <p>
          This is a third example tab.
        </p>
      </div>
    </Tab>
  </Tabs>
);

export default connect(mapStateToProps)(App);