import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardHeader } from 'material-ui/Card';
import Form from './Form';
import async from 'reduxConfig/actions/async';

import { TransferContainer } from './styled';

class AccountInfo extends Component {
  componentWillReceiveProps(props) {
    // TODO update balance
    if (props.transfer.needShowData === true) {
      // this.props.updateBalance();
      // this.props.dispatch(async.reset(async.methodList.event.add));
    }
  };

  componentWillMount() {

  };

  render() {
    const { transfer: { error } } = this.props;

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
            asyncError={error}
          />
        </CardHeader>
      </TransferContainer>
    )
  };

  handleConfirm = (e) => {
    e.preventDefault(e);
    const { form: { values = {}} } = this.props;

    this.props.send({
      dest: values.addressTo,
      amount: parseFloat(values.amount),
      commission: parseFloat(values.commission),
      data: values.message,
    });
  }
}

const mapStateToProps = function (state) {
  return {
    transfer: async.getStoreState(state, async.methodList.event.add),
    form: state.form['transfer'],
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
    // updateBalance: (params) => {
    //   dispatch(async.load(async.methodList.account.getInfo));
    // },
    setError: (error) => {
      dispatch(async.actions.fail({
        method: async.methodList.account.getInfo,
        data: error,
      }))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);
