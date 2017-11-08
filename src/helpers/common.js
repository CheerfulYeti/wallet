import uuid from 'uuid';
export function str2ab(str) {
  let buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  let bufView = new Uint16Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

export function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

export const guId = () => {
  return uuid.v4(new Date().getTime());
};

export function string2Bin(str) {
  let result = [];
  for (let i = 0; i < str.length; i++) {
    result.push(str.charCodeAt(i));
  }
  return result;
}