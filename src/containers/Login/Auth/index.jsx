import React, { Component } from 'react';
import { connect } from 'react-redux';
import BaseContainer from 'components/BaseContainer';
import { loadFromFile } from 'helpers/file';
import { getImportedKeys, sign, verify, decrypt } from 'helpers/crypro';
import { setKeys } from 'reduxConfig/actions/User';
import Form from './Form';

const mapStateToProps = function (state) {
  return {
    formState: state.form['auth'],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setKeys: (keys) => {
      dispatch(setKeys(keys));
    },
  };
};

class Registration extends Component {
  static propTypes = {};
  
  static defaultProps = {};
  
  constructor(props) {
    super(props);
    
    this.state = {
      keyFileName: '',
    };
  }
  
  componentWillReceiveProps(props) {
  
  };
  
  componentWillMount() {
  
  };
  
  render() {
    return (
      <BaseContainer>
        <Form
          handleSubmit={this.handleConfirm} onLoadFile={this.handleLoadFile} keyFileName={this.state.keyFileName}
        />
      </BaseContainer>
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
      getImportedKeys(data).then(() => {
        this.props.setKeys(data);
        console.log("point-1510242125263", 'load success, user logged in');
      });
    }
    catch (e) {
      console.error("Wrong password or key file");
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
