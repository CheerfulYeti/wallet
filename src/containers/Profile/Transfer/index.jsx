import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardActions, CardHeader, CardText } from 'material-ui/Card';
import Form from './Form';
import async from 'reduxConfig/actions/async';

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
    // const { error } = accountInfo;


    return (
      <TransferContainer>
        <CardHeader
          title="Transfer"
          actAsExpander={false}
          showExpandableButton={false}
        >
          <Form
            handleSubmit={this.handleConfirm}
            onLoadFile={this.handleLoadFile}
            // asyncError={error}
          />
        </CardHeader>
      </TransferContainer>
    )
  };

  handleConfirm = (e) => {
    e.preventDefault(e);
    const { form: { values = {}}, publicKey } = this.props;

    this.props.send({
      source: publicKey,
      dest: values.addressTo,
      amount: parseFloat(values.amount),
      commission: parseFloat(values.commission),
    });
  }
};

const mapStateToProps = function (state) {
  console.log('async.methodList: ', async.methodList);
  console.log('getStoreState: ', async.getStoreState(state, async.methodList.event.add));
  
  return {
    transfer: async.getStoreState(state, async.methodList.event.add),
    form: state.form['transfer'],
    publicKey: state.user.publicKey,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    send: (params) => {
      dispatch(async.load(async.methodList.event.add, {
        ...params,
        type: 0,
      }));
    },
    setError: (error) => {
      dispatch(async.actions.fail({
        method: async.methodList.account.getInfo,
        data: error,
      }))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);
