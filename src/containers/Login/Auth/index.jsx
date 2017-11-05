import React, { Component } from 'react';
import { connect } from 'react-redux';
import { store } from 'reduxConfig/storeConfig';
// import Actions from 'reduxConfig/actions/`Auth`Actions';

import { Container } from './styled';

const mapStateToProps = function (state) {
  return {
    // REPLACE
    // data: state.$ComponentName.data,
  };
};

class Auth extends Component {

  static propTypes = {};

  static defaultProps = {};

  componentWillReceiveProps(props) {

  };

  componentWillMount() {

  };

  render() {
    return (
      <Container>Auth</Container>
    )
  };
};

export default connect(mapStateToProps)(Auth);
