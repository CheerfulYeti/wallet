import CryptoJS from 'crypto-js';
import CryptoSHA256  from 'crypto-js/sha256';
import NodeRSA from 'node-rsa';

export async function generateKey() {
  try {
    let key = new NodeRSA({ b: 64 });
    return await key.generateKeyPair();
  } catch(e) {
    throw e;
  }
}

export async function exportKeys(key, isPrivate = false) {
  try {
    const type = `pkcs8-${isPrivate ? 'private' : 'public'}-pem`;
    return key.exportKey(type);
  }
  catch (e) {
    throw e;
  }
}

export async function getExportedKeys(keys) {
  try {
    return await Promise.all([
      exportKeys(keys),
      exportKeys(keys, true)
    ]);
  }
  catch (e) {
    throw e;
  }
}

export async function getImportedKeys(privateKey) {
  try {
    return await new NodeRSA(privateKey);
  }
  catch (e) {
  }
}

const flattenData = (data) => {
  let result = '';
  Object.keys(data)
    .sort()
    .forEach((key) => {
    let value = data[key];
    if (typeof data[key] === 'object') {
      value = flattenData(data[key]);
    }
    if (value !== undefined) {
      result += `${key}` + `${value}`;
    }
  });
  return result;
};

export async function sign(key, data) {
  data = flattenData(data);
  console.log('data: ', data);
  
  try {
    return await key.sign(data, 'base64', 'utf8');
  } catch(e) {
    console.log("%cP-1510416081503", 'background: #222; color: #bada55', err);
    throw e;
  }
}

export async function verify(key, signature, data) {
  data = flattenData(data);
  
  try {
    return await key.verify(data, signature, 'utf8', 'base64');
  }
  catch (err) {
    console.log("%cP-1510416081503", 'background: #222; color: #bada55', err);
    throw err;
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
  return bytes.toString(CryptoJS.enc.Hex);
};

export const base64Encode = (str) => {
  const b = new Buffer(str);
  return b.toString('base64');
};

export const base64Decode = (str) => {
  const b = new Buffer(str, 'base64');
  return b.toString();
};

export function arrayBufferToBase64( buffer ) {
  let binary = '';
  let bytes = new Uint8Array( buffer );
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode( bytes[ i ] );
  }
  return window.btoa( binary );
}

export function base64ToArrayBuffer(base64) {
  let binary_string =  window.atob(base64);
  let len = binary_string.length;
  let bytes = new Uint8Array( len );
  for (let i = 0; i < len; i++)        {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}