import React, {Component}  from 'react';
import {connect} from 'react-redux';
import {setTest} from 'reduxConfig/actions/App';
import {getLatestRates} from 'reduxConfig/actions/Currency';
import ApiResponse from 'components/ApiResponse';

// Styles
import { AppContainer } from './styled';
import Button from 'components/Button';

const mapStateToProps = function (store) {
  return {
    testState: store.appState.test,
    latestRatesState: store.currencyState.async.getLatestRates
  };
};

class App extends Component {

  render() {
    return (
      <AppContainer>
        <h2>Wallet app</h2>

        <Button onClick={() => this.handleClick(!this.props.testState)}>
          Request API: {this.props.latestRatesState.status}
        </Button>

        <ApiResponse asyncState={this.props.latestRatesState}/>
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

export default connect(mapStateToProps)(App);