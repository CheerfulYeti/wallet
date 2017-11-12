import React, { Component } from 'react';
import { connect } from 'react-redux';
import async from 'reduxConfig/actions/async';
import store from 'reduxConfig/store';

import { AccountInfoContainer, List, ListItem, Label, Value } from './styled';

class AccountInfo extends Component {
  componentWillMount() {
    this.load();
  }
  
  render() {
    const { accountInfo: info, publicHash = '', } = this.props;
    const accountInfo = info === null ? {} : info;
    const {
      amount = 0,
    } = accountInfo;
    
    return (
      <AccountInfoContainer>
        <List>
          <ListItem>
            <Label>Balance: </Label>
            <Value>{amount}</Value>
          </ListItem>
          <ListItem>
            <Label>Account address: </Label>
            <Value>{publicHash}</Value>
          </ListItem>
        </List>
      </AccountInfoContainer>
    )
  };
  
  load = () => {
    this.props.loadAccountInfo();
    setTimeout(() => {
      if (!this.props.accountInfo.needShowError) {
        this.load();
      }
    }, 50000);
  }
}

const mapStateToProps = function (state) {
  return {
    accountInfo: async.getStoreState(state, async.methodList.account.getInfo.alias),
    publicHash: state.user.publicHash,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAccountInfo: () => {
      const state = store.getState();
      dispatch(async.load(async.methodList.account.getInfo.alias, {
        accountHash: state.user.publicHash,
      }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);
