import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionInfo from 'material-ui/svg-icons/action/info';

import store from 'reduxConfig/store';
// import Actions from 'reduxConfig/actions/`Profile`Actions';

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
        <List>
          <ListItem
            leftAvatar={<Avatar icon={<FileFolder />} />}
            rightIcon={<ActionInfo />}
            primaryText="Photos"
            secondaryText="Jan 9, 2014"
          />
        </List>
      </Container>
    )
  };
};

export default connect(mapStateToProps)(Profile);
