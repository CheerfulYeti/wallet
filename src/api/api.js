import forge from 'mappersmith';
import config from './config';
import get from 'lodash/get';

const apiAlias = 'localhost';

const client = forge({
  host: config.api[apiAlias].host,
  resources: {
    account: {
      register: {
        method: 'post',
        path: 'account/register',
      },
    },
  }
});

export default function (resource, params) {
  console.log(params);
  let headers = {};
  if (params.publicKey) {
    headers['X-Public-Key'] = params.publicKey;
    delete params.publicKey;
  }
  console.log("point-1510391903559", params, headers);
  return get(client, resource)({
    headers,
    body: params,
  });
}