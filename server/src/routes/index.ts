export default [
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
