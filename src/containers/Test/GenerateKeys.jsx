import React, { Component } from 'react';
import { defaultKeysFileName } from 'config/app';
import { saveToFile } from 'helpers/file';
import { generateKey, getExportedKeys, encrypt } from 'helpers/crypro';

const password = "fhskefhekjh";
function test() {
  generateKey().then(keys => {
    // console.log("point-1510086788259", keys);
    getExportedKeys(keys).then(exportedKeys => {
      const [publicKey, privateKey] = exportedKeys;
  
      const data = {
        privateKey: encrypt(privateKey, password),
        publicKey,
        date: new Date().getTime(),
      };
      // console.log("point-1510085824729", data);
      saveToFile(defaultKeysFileName, data);
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