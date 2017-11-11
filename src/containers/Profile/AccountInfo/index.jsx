import React, { Component } from 'react';
import { connect } from 'react-redux';
import async from 'reduxConfig/actions/async';

import { AccountInfoContainer, List, ListItem, Label, Value } from './styled';

class AccountInfo extends Component {

  render() {
    console.log('AccountInfo props: ', this.props);
    const {
      accountInfo: {
        data: {
          amount = 0,
        } = {}
      } = {},
      publicHash = '',
    } = this.props;
    
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
};

const mapStateToProps = function (state) {
  return {
    accountInfo: async.getStoreState(state, async.methodList.account.getInfo),
    publicHash: state.user.publicHash,
  };
};

export default connect(mapStateToProps)(AccountInfo);
