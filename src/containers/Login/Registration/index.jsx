import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'styledComponents/RaisedButton';

import BaseContainer from 'components/BaseContainer';
import Centered from 'styledComponents/centered';
import RouteList from 'router/routeList';

import Form from './Form';
import generateKeyFile from './Keys';

class Registration extends Component {

  static propTypes = {};

  static defaultProps = {};

  componentWillReceiveProps(props) {

  };

  componentWillMount() {

  };

  render() {
    return (
      <BaseContainer>
        <Centered>
        {
          this.props.isFileGenerated
            ? <Link to={RouteList.loginAuth}>
                <Button secondary type="submit" label="Unlock your wallet"/>
              </Link>
            : <Form handleSubmit={this.handleConfirm}/>
        }
        </Centered>
      </BaseContainer>
    )
  };

  handleConfirm = (e) => {
    e.preventDefault(e);
    console.log('pass: ', this.props.password);

    generateKeyFile(this.props.password);
  }
};

const mapStateToProps = function (state) {
  const {
    form: {
      registration: {
        values: { password = '' } = {}
      } = {}
    } = {},
    keys: { isFileGenerated }
  } = state;
  return {
    password,
    isFileGenerated,
  };
};

export default connect(mapStateToProps)(Registration);
