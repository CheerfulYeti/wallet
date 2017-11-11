import forge from 'mappersmith';
import config from './config';
import get from 'lodash/get';
import resources from './resources';

const apiAlias = 'localhost';

const errorMiddleware = () => ({
  request(request) {
    let headers = {};
    if (request.publicKey) {
      headers['X-Public-Key'] = request.publicKey;
      delete request.publicKey;
    }
    
    return request.enhance({
      headers,
      body: request,
    })
  },
  
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
  return get(client, resource)(params);
}