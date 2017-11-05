import React, {Component}  from 'react';
import {connect} from 'react-redux';
import {setTest} from 'redux/actions/App';
import {getLatestRates} from 'redux/actions/Currency';
import ApiResponse from 'components/ApiResponse';

// Styles
import { AppContainer, Button } from './styled';

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
        <h2>React-Redux-Starter-Kit</h2>

        <Button onClick={() => this.handleClick(!this.props.testState)}>
          Request API: {this.props.latestRatesState.status}
        </Button>

        <ApiResponse asyncState={this.props.latestRatesState}/>
      </AppContainer>
    )
  };

  handleClick(value) {
    // set some state in the redux store
    this.props.dispatch(setTest(value));
    // make an API request
    this.loadLatestRates();
  };

  loadLatestRates() {
    this.props.dispatch(getLatestRates());
  };
}
;

export default connect(mapStateToProps)(App);