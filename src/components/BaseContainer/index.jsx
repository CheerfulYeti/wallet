import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BaseContainer } from './styled';

export default class extends Component {

  static propsTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  render() {
    const { children } = this.props;

    return (
      <BaseContainer>{children}</BaseContainer>
    )
  }
};
