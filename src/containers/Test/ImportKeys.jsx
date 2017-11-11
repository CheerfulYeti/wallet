import React, { Component } from 'react';
import { loadFromFile } from 'helpers/file';
import { getImportedKeys, sign, verify, decrypt } from 'helpers/crypto';
import { str2ab, ab2str } from 'helpers/common';

const password = "fhskefhekjh";
const text = "dwdwdw";
function handleFileSelect(evt) {
  loadFromFile(evt.target, (content) => {
    // console.log("point-1510168382605", content);
    const data = JSON.parse(content);
    data.privateKey = decrypt(data.privateKey, password);
    getImportedKeys(data).then(importedKeys => {
      const [publicKey, privateKey] = importedKeys;
      // console.log("point-1510089245164", publicKey, privateKey);
      sign(privateKey, str2ab(text)).then(signature => {
        console.log("point-1510086164751", signature, ab2str(signature));
        verify(publicKey, signature, str2ab(text)).then(data => {
          console.log("point-1510086180508 verify success", data);
        })
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