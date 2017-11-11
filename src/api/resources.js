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
      useStub: true,
      method: method.get,
      path: 'account/info/{accountHash}',
    },
  },
  event: {
    add: {
      useStub: false,
      method: method.post,
      path: 'event/post',
    }
  },
};