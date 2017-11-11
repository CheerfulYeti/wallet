import forge from 'mappersmith';
import config from './config';
import get from 'lodash/get';
import resources from './resources';

const apiAlias = 'localhost';

const errorMiddleware = () => ({
  response(next) {
    return next().then((response) => {
      let data = {};
      try {
        data = JSON.parse(response.data());
      } catch (e) {}
      // if (!data.status) {
      //   throw {
      //     code: data.status,
      //     message: data.message ? data.message : 'Произошла непредвиденная ошибка',
      //   };
      // }
      return data;
    });
  }
});

const client = forge({
  resources,
  middlewares: [ errorMiddleware ],
  host: config.api[apiAlias].host,
});

export default function (resource, params) {
  let headers = {};
  if (params.publicKey) {
    headers['X-Public-Key'] = params.publicKey;
    delete params.publicKey;
  }
  return get(client, resource)({
    headers,
    body: params,
  });
}