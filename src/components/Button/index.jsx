import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

export default class Button extends Component {
  static propsTypes = {
    onClick: PropTypes.func,
    isDisabled: PropTypes.bool,
  };
  
  render() {
    const { children, onClick, isDisabled } = this.props;
    const className = cn({
      "component-button": true,
      disabled: isDisabled
    });
    
    return (
      <RaisedButton className={className} label={children} primary style={style} onClick={onClick} />
    )
  }
};