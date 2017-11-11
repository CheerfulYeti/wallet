import { defaultKeysFileName } from 'config/app';
import { saveToFile } from 'helpers/file';
import { generateKey, getExportedKeys, encrypt } from 'helpers/crypto';

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
      store.dispatch(setIsFileGenerated(true));
      store.dispatch(load(methodList.account.register, {
        publicKey: publicKey.n,
      }));
    });
  });
}
