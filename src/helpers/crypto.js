import CryptoJS from 'crypto-js';
import CryptoSHA256  from 'crypto-js/sha256';
import { algo, hashName } from 'config/app';
import { string2Bin } from './common';

export async function generateKey() {
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

export async function exportKeys(key) {
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

export async function importKeys(key, isPrivate = false) {
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

export async function getExportedKeys(keys) {
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

export async function getImportedKeys(keys) {
  try {
    return await Promise.all([
      importKeys(keys.publicKey),
      importKeys(keys.privateKey, true)
    ]);
  }
  catch (e) {
  }
}

export async function sign(privateKey, data) {
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

export async function verify(publicKey, signature, data) {
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

export const encrypt = (text, password) => {
  const bytes = CryptoJS.AES.encrypt(JSON.stringify(text), password);
  return bytes.toString();
};

export const decrypt = (text, password) => {
  const bytes = CryptoJS.AES.decrypt(text, password);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const sha256 = (str) => {
  const bytes = CryptoSHA256(str);
  return bytes.toString(CryptoJS.enc.Hex);;
};

// const enc = encrypt("test", "123");
// console.log("point-1510171533372", enc);
// console.log("point-1510171539532", decrypt(enc, "123"));