import React, { Component } from 'react';
import { connect } from 'react-redux';
import BaseContainer from 'components/BaseContainer';
import { loadFromFile } from 'helpers/file';
import { getImportedKeys, sha256, decrypt, base64Encode } from 'helpers/crypto';
import { setKeys } from 'reduxConfig/actions/user';
import async from 'reduxConfig/actions/async';
import AsyncBlock from 'components/AsyncBlock';
import Form from './Form';

import { ContainerStyled } from './styled';

class Auth extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      keyFileName: '',
    };
  }

  render() {
    const { accountInfo } = this.props;
    const { error } = accountInfo;
    return (
      <ContainerStyled>
        <AsyncBlock
          asyncState={accountInfo}
        >
          <BaseContainer>
            <Form
              handleSubmit={this.handleConfirm}
              onLoadFile={this.handleLoadFile}
              keyFileName={this.state.keyFileName}
              asyncError={error}
            />
          </BaseContainer>
        </AsyncBlock>
      </ContainerStyled>
    )
  };
  
  keyFileContent = null;
  
  handleLoadFile = (e, keyFileName) => {
    loadFromFile(e.target, (content) => {
      this.keyFileContent = JSON.parse(content);
      this.setState({
        keyFileName: keyFileName.split('\\').pop(),
      });
    });
  };
  
  handleConfirm = (e) => {
    e.preventDefault(e);
    const { formState } = this.props;
    let password = null;
    if (formState.values && formState.values.password !== undefined) {
      password = formState.values.password
    }
    if (!this.keyFileContent || password === null) {
      return false;
    }
    
    const data = this.keyFileContent;
    try {
      data.privateKey = decrypt(data.privateKey, password);
      getImportedKeys(data.privateKey).then(() => {
        data.publicHash = sha256(base64Encode(data.publicKey));
        this.props.setKeys(data);
        this.props.history.push('/profile');
      });
    }
    catch (e) {
      this.props.setError({
        code: -100,
        message: "Wrong password or key file",
      });
    }
  }
}

const mapStateToProps = function (state) {
  return {
    accountInfo: async.getStoreState(state, async.methodList.account.getInfo.alias),
    formState: state.form['auth'],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setKeys: (keys) => {
      dispatch(setKeys(keys));
    },
    setError: (error) => {
      dispatch(async.actions.fail({
        method: async.methodList.account.getInfo.alias,
        data: error,
      }))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
