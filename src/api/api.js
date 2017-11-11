import forge from 'mappersmith';
import config from './config';
import get from 'lodash/get';
import resources from './resources';

const apiAlias = 'localhost';

const createStubURI = function(uri = '') {
  return uri
    .replace(/(\/\{\w+\})/g, '')
    .replace(/\//g, '_') + '.json';
};

const prepareResources = function(resources) {
  const result = {};

  Object.keys(resources).forEach((groupKey) => {
    const methodList = resources[groupKey];
    result[groupKey] = {};

    Object.keys(methodList).forEach((methodKey) => {
      const item = methodList[methodKey];

      result[groupKey][methodKey] = {
        ...item,
        path: (item.useStub) ? createStubURI(item.path) : item.path,
      };
    });
  });
  console.log('prepareResources.result: ', result);

  return result;
};

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

const stubMiddleware = () => ({
  request(request) {
    const result = request.enhance({
      path: createStubURI(request.path()),
    });

    return result;
  }
});

const client = forge({
  resources,
  middlewares: [ dataMiddleware ],
  host: config.api[apiAlias].host,
});

const stubClient = forge({
  resources: prepareResources(resources),
  middlewares: [ dataMiddleware, stubMiddleware ],
  host: config.api.stub.host,
});

export default function (resource, params) {
  const resourceConfig = get(resources, resource);

  return get(
    (resourceConfig.useStub) ? stubClient : client,
    resource
  )(params);
}