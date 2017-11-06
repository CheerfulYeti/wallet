import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';

import { Container } from 'components/Button/styled';

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
      <Container>
        <RaisedButton
          label={children}
          primary
          disabled={disabled}
          onClick={onClick}
        />
      </Container>
    )
  }
};