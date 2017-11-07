import React, { Component } from 'react';
import { saveToFile } from 'helpers/file';


const algo = "RSA-PSS";
const hashName = 'SHA-256';

async function generateKey() {
  try {
    return await window.crypto.subtle.generateKey(
      {
        name: algo,
        modulusLength: 2048, //can be 1024, 2048, or 4096
        publicExponent: new Uint8Array([
          0x01,
          0x00,
          0x01
        ]),
        hash: { name: hashName }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
      },
      true, //whether the key is extractable (i.e. can be used in exportKey)
      [
        "sign",
        "verify"
      ] //can be any combination of "sign" and "verify"
    );
  }
  catch (e) {
    throw e;
  }
}

async function exportKeys(key) {
  try {
    return await window.crypto.subtle.exportKey(
      "jwk", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
      key, //can be a publicKey or privateKey, as long as extractable was true
    );
  }
  catch (e) {
    throw e;
  }
}

async function importKeys(key, isPrivate = false) {
  console.log("point-1510089391445", key);
  try {
    return await window.crypto.subtle.importKey(
      "jwk", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
      key,
      {   //these are the algorithm options
        name: algo,
        hash: { name: hashName }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
      },
      true, //whether the key is extractable (i.e. can be used in exportKey)
      [
        isPrivate ? "sign" : "verify"
      ] //"verify" for public key import, "sign" for private key imports
    );
  }
  catch (e) {
    throw e;
  }
}

async function getKeys() {
  try {
    return await generateKey();
  }
  catch (e) {
    throw e;
  }
}

async function getExportedKeys(keys) {
  try {
    return await Promise.all([
      exportKeys(keys.publicKey),
      exportKeys(keys.privateKey)
    ]);
  }
  catch (e) {
    throw e;
  }
}

async function getImportedKeys(keys) {
  console.log("point-1510089377608", keys);
  try {
    return await Promise.all([
      importKeys(keys.publicKey),
      importKeys(keys.privateKey, true)
    ]);
  }
  catch (e) {
  }
}

function str2ab(str) {
  let buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  let bufView = new Uint16Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

async function sign(privateKey, data) {
  console.log("point-1510086833531", privateKey);
  try {
    return await window.crypto.subtle.sign(
      {
        name: algo,
        saltLength: 128, //the length of the salt
      },
      privateKey, //from generateKey or importKey above
      data //ArrayBuffer of data you want to sign
    );
  }
  catch (err) {
    console.error(err);
  }
}

async function verify(publicKey, signature, data) {
  try {
    return await window.crypto.subtle.verify(
      {
        name: algo,
        saltLength: 128, //the length of the salt
      },
      publicKey, //from generateKey or importKey above
      signature, //ArrayBuffer of the signature
      data //ArrayBuffer of the data
    );
  }
  catch (err) {
  }
}

function test() {
  getKeys().then(keys => {
    console.log("point-1510086788259", keys);
    getExportedKeys(keys).then(exportedKeys => {
      const [publicKey, privateKey] = exportedKeys;
      const data = {
        privateKey,
        publicKey,
        date: new Date().getTime(),
      };
      console.log("point-1510085824729", data);
      // saveToFile('myKeys.keys', data);
      
      getImportedKeys(JSON.parse(JSON.stringify(data))).then(importedKeys => {
        const [publicKey, privateKey] = importedKeys;
        console.log("point-1510089245164", publicKey, privateKey);
        const text = "test";
        console.log("point-1510088202201", ab2str(str2ab(text)));
        sign(privateKey, str2ab(text)).then(signature => {
          console.log("point-1510086164751", signature, ab2str(signature));
          verify(publicKey, signature, str2ab(text)).then(data => {
            console.log("point-1510086180508", data);
          })
        })
      });
    });
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
    test();
  };
}


export default GenerateKeys;