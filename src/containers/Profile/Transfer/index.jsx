import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardActions, CardHeader, CardText } from 'material-ui/Card';
import Form from './Form';

import store from 'reduxConfig/store';
// import Actions from 'reduxConfig/actions/`AccountInfo`Actions';

import { TransferContainer } from './styled';

class AccountInfo extends Component {

  static propTypes = {};

  static defaultProps = {};

  componentWillReceiveProps(props) {

  };

  componentWillMount() {

  };

  render() {
    return (
      <TransferContainer>
        <CardHeader
          title="Transfer"
          actAsExpander={false}
          showExpandableButton={false}
        >
          <Form />
        </CardHeader>
      </TransferContainer>
    )
  };
};

const mapStateToProps = function (state) {
  return {
    // REPLACE
    // data: state.$ComponentName.data,
  };
};

export default connect(mapStateToProps)(AccountInfo);
