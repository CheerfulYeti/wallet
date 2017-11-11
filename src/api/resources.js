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
      useStub: true,
      method: method.post,
      path: 'event/add',
    }
  },
};