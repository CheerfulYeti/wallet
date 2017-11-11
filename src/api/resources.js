const method = {
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
      method: method.get,
      path: 'account/info/{hash}',
    },
  },
};