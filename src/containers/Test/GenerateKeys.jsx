import React, { Component } from 'react';

async function generateKey() {
  try {
    const key = await window.crypto.subtle.generateKey(
      {
        name: "RSA-PSS",
        modulusLength: 2048, //can be 1024, 2048, or 4096
        publicExponent: new Uint8Array([
          0x01,
          0x00,
          0x01
        ]),
        hash: { name: "SHA-256" }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
      },
      false, //whether the key is extractable (i.e. can be used in exportKey)
      [
        "sign",
        "verify"
      ] //can be any combination of "sign" and "verify"
    );
    console.log(key);
    console.log(key.publicKey);
    console.log(key.privateKey);
    resolve(key);
  } catch(e) {
    console.error("point-1509987800826 error", e);
    resolve(null);
  }
}

async function exportKey() {
  window.crypto.subtle.exportKey(
    "jwk", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
    publicKey //can be a publicKey or privateKey, as long as extractable was true
  )
    .then(function(keydata){
      //returns the exported key data
      console.log(keydata);
    })
    .catch(function(err){
      console.error(err);
    });
}

class GenerateKeys extends Component {
  render() {
    return (
      <div>
        <button onClick={this.onClick}>Generate keys</button>
      </div>
    );
  }
  
  onClick = () => {
    let key = generateKey();
    console.log("point-1509987891156", key);
  };
}


export default GenerateKeys;