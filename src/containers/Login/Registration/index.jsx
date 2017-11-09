import React, { Component } from 'react';
import { connect } from 'react-redux';
import BaseContainer from 'components/BaseContainer';
import { defaultKeysFileName } from 'config/app';
import { saveToFile } from 'helpers/file';
import { generateKey, getExportedKeys, encrypt } from 'helpers/crypro';
import Form from './Form';

const saveKeys = (password) => {
  generateKey().then(keys => {
    getExportedKeys(keys).then(exportedKeys => {
      const [publicKey, privateKey] = exportedKeys;
      const data = {
        privateKey: encrypt(privateKey, password),
        publicKey,
        date: new Date().getTime(),
      };
      saveToFile(defaultKeysFileName, data);
    });
  });
};

const mapStateToProps = function (state) {
  return {
    formState: state.form['registration'],
  };
};

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
        <Form handleSubmit={this.handleConfirm}/>
      </BaseContainer>
    )
  };

  handleConfirm = (e) => {
    e.preventDefault(e);
    const { formState } = this.props;
    let password = null;
    if (formState.values && formState.values.password !== undefined) {
      password = formState.values.password
    }
    if (password === null) {
      return false;
    }
    saveKeys(password);
  }
}

export default connect(mapStateToProps)(Registration);
