const method = {
  post: 'post',
};

export default {
  account: {
    register: {
      method: method.post,
      path: 'account/register',
    },
    getInfo: {
      method: method.post,
      path: 'account/info',
    }
    
  },
};