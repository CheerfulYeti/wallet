import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionInfo from 'material-ui/svg-icons/action/info';

import store from 'reduxConfig/store';
// import Actions from 'reduxConfig/actions/`Profile`Actions';

import AccountInfo from './AccountInfo';
import Transfer from './Transfer';
import { Container } from './styled';

const mapStateToProps = function (state) {
  return {
    // REPLACE
    // data: state.$ComponentName.data,
  };
};

class Profile extends Component {

  static propTypes = {};

  static defaultProps = {};

  componentWillReceiveProps(props) {

  };

  componentWillMount() {

  };

  render() {
    return (
      <Container>
        <AccountInfo />
        <Transfer />
      </Container>
    )
  };
};

export default connect(mapStateToProps)(Profile);
