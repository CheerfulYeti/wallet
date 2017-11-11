import React, { Component } from 'react';
import { defaultKeysFileName } from 'config/app';
import { saveToFile } from 'helpers/file';
import { generateKey, getExportedKeys, encrypt, sign, verify } from 'helpers/crypto';

function test(password = '11') {
  generateKey().then(keys => {
    getExportedKeys(keys).then(exportedKeys => {
      const [publicKey, privateKey] = exportedKeys;
      const data = {
        privateKey: encrypt(privateKey, password),
        publicKey,
        date: new Date().getTime(),
      };
      saveToFile(defaultKeysFileName, data);
      
      const request = {
        timestamp: new Date().getTime(),
      };
      sign(keys, request).then(signature => {
        verify(keys, signature, request).then(data => {
          console.log("point-1510086180508 verify result", data);
        });
      });
    });
  });
}

class GenerateKeys extends Component {
  render() {
    return (
      <div>
        <button onClick={this.onClick}>Generate and save keys</button>
      </div>
    );
  }
  
  onClick = () => {
    test();
  };
}


export default GenerateKeys;