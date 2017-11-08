import React, { Component } from 'react';
import { connect } from 'react-redux';
import BaseContainer from 'components/BaseContainer';

import Form from './Form';

const mapStateToProps = function (state) {
  return {
    // REPLACE
    // data: state.$ComponentName.data,
  };
};

class Registration extends Component {

  static propTypes = {};

  static defaultProps = {};

  componentWillReceiveProps(props) {

  };

  componentWillMount() {

  };

  render() {
    return (
      <BaseContainer>
        <Form handleSubmit={this.handleConfirm}/>
      </BaseContainer>
    )
  };

  handleConfirm = (e, data) => {
    e.preventDefault(e);
    console.log('data: ', e);
  }
};

export default connect(mapStateToProps)(Registration);
