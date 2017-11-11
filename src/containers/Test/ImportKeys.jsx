import React, { Component } from 'react';
import { loadFromFile } from 'helpers/file';
import { getImportedKeys, sign, verify, decrypt } from 'helpers/crypto';

const password = "11";
const request = {
  timestamp: new Date().getTime(),
};
function handleFileSelect(evt) {
  loadFromFile(evt.target, (content) => {
    const data = JSON.parse(content);
    data.privateKey = decrypt(data.privateKey, password);
    getImportedKeys(data.privateKey).then((keys) => {
      sign(keys, request).then(signature => {
        verify(keys, signature, request).then(data => {
          console.log("point-1510086180508 verify result", data);
        });
      });
    });
  });
}

class ImportKeys extends Component {
  render() {
    return (
      <div>
        <input type="file" onChange={e => {
          handleFileSelect(e);
        }}/>
      </div>
    );
  }
}


export default ImportKeys;