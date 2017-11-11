import { defaultKeysFileName } from 'config/app';
import { saveToFile } from 'helpers/file';
import { generateKey, getExportedKeys, encrypt, sign, verify, arrayBufferToBase64, base64ToArrayBuffer } from 'helpers/crypto';

import store from 'reduxConfig/store';
import { setIsFileGenerated } from 'reduxConfig/actions/keys';
import { load, methodList } from 'reduxConfig/actions/async';

export default function generateKeyFile(password) {
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
        // verify(keys, signature, request).then(data => {
        //   console.log("point-1510086180508 verify result", data);
        // });
  
        request.signature = signature;
        request.publicKey = publicKey;
        store.dispatch(load(methodList.account.register, request));
        store.dispatch(setIsFileGenerated(true));
      });
      
    });
  });
}
