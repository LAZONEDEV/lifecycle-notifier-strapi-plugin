import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('lifecycle-notifier')
      .service('myService')
      .getWelcomeMessage();
  },
});
