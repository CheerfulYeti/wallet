import forge from 'mappersmith';
import config from './config';
import get from 'lodash/get';
import resources from './resources';

const apiAlias = 'localhost';

const dataMiddleware = () => ({
  request(request) {
    let headers = {};
    if (request.requestParams.publicKey) {
      headers['X-Public-Key'] = request.requestParams.publicKey;
      delete request.requestParams.publicKey;
    }
    return request.enhance({
      headers,
    });
  },
  
  response(next) {
    return next().then((response) => {
      let data = {};
      try {
        data = response.data();
      } catch (e) {}
      if (data.status === undefined || data.status !== 0) {
        throw {
          code: data.status,
          message: data.message ? data.message : 'Произошла непредвиденная ошибка',
        };
      }
      return data;
    });
  },
});

const client = forge({
  resources,
  middlewares: [ dataMiddleware ],
  host: config.api[apiAlias].host,
});

export default function (resource, params) {
  return get(client, resource)(params);
}