export const method = {
  post: 'post',
  get: 'get',
};

const methodList = {
  account: {
    register: {
      method: method.post,
      path: 'account/register',
    },
    getInfo: {
      useStub: false,
      method: method.get,
      path: 'account/info/{accountHash}',
    },
  },
  event: {
    add: {
      useStub: false,
      method: method.post,
      path: 'event/add',
      getRequest: (params) => {
        function prepareData(params) {
          if (params.type === 1) {
            return {
              title: params.title,
              content: params.content,
            }
          }
          return params.data;
        }

        return {
          commission: params.commission,
          type: params.type,
          amount: params.amount,
          dest: params.dest,
          data: prepareData(params),
          datetime: params.datetime,
        };
      }
    },
    getUnacceptedList: {
      method: method.get,
      path: 'event/mempool/{type}',
    },
    getAcceptedList: {
      method: method.get,
      path: 'event/approved/{type}',
    },
  },
};

function generateAlias(list, pathList = []) {
  Object.keys(list).forEach(key => {
    const paths = [...pathList, key];
    if (list[key].path) {
      list[key].alias = paths.join('.');
    } else {
      generateAlias(list[key], paths);
    }
  });
}

generateAlias(methodList);

export default methodList;

