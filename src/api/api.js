import forge from 'mappersmith';
import config from './config';
import get from 'lodash/get';
import resources, { method } from './resources';

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
        method: (item.useStub) ? 'get' : item.method,
      };
    });
  });

  return result;
};

const dataMiddleware = ({ resourceName, resourceMethod }) => ({
  request(request) {
    console.log('request: ', request);
    const resourceConfig = resources[resourceName][resourceMethod];
    if (request.requestParams && resourceConfig && resourceConfig.method === method.post) {
      let headers = request.headers();
      if (request.requestParams.postHeaders) {
        headers = {
          ...headers,
          ...request.requestParams.postHeaders,
        };
        delete request.requestParams.postHeaders;
      }
      
      const content = JSON.stringify(request.requestParams);
      request.requestParams = {
        headers,
        body: content,
      };
      return request;
    }
    return request;
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
      return data.data === undefined ? null : data.data;
    });
  },
});

const stubMiddleware = () => ({
  request(request) {
    return request.enhance({
      path: createStubURI(request.path()),
    });
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