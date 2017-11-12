export const method = {
  post: 'post',
  get: 'get',
};

export default {
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
        return {
          commission: params.commission,
          type: params.type,
          amount: params.amount,
          dest: params.dest,
          data: params.data,
          datetime: params.datetime,
        };
      }
    }
  },
};