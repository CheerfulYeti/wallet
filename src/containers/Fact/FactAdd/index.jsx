import React, { Component } from 'react';
import { connect } from 'react-redux';
// import store from 'reduxConfig/store';
// import Actions from 'reduxConfig/actions/`FactAdd`Actions';

import { Container } from './styled';

class FactAdd extends Component {

  static propTypes = {};

  static defaultProps = {};

  componentWillReceiveProps(props) {

  };

  componentWillMount() {

  };

  render() {
    return (
      <Container>

      </Container>
    )
  };
};

const mapStateToProps = function (state) {
  return {
    // REPLACE
    // data: state.$ComponentName.data,
  };
};

export default connect(mapStateToProps)(FactAdd);
