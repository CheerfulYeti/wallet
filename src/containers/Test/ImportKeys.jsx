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
    console.log("%cP-1510436116156", 'background: #222; color: #bada55', data);
    getImportedKeys(data).then(importedKeys => {
      sign(importedKeys, request).then(signature => {
        verify(importedKeys, signature, request).then(data => {
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