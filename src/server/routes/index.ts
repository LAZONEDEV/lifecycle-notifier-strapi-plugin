export default [
  {
    method: 'GET',
    path: '/',
    handler: 'configs.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/env-recipients',
    handler: 'configs.envRecipients',
    config: {
      policies: [],
    }, 
  },
  {
    method: 'GET',
    path: '/interceptors',
    handler: 'interceptors.getInterceptors',
    config: {
      policies: [],
    }, 
  },
];
