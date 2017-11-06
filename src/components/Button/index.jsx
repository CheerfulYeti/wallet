import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyledButton } from './styled';

export default class Button extends Component {
  static propsTypes = {
    onClick: PropTypes.func,
    isDisabled: PropTypes.bool,
  };

  static defaultProps = {
    onClick: null,
    isDisabled: false,
  };
  
  render() {
    const { children, onClick, isDisabled: disabled } = this.props;
    
    return (
      <StyledButton
        label={children}
        primary
        disabled={disabled}
        onClick={onClick}
      />
    )
  }
};