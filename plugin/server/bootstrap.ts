import { Strapi } from '@strapi/strapi';
import pluginId from '../common/utils/plugin';

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.db.lifecycles.subscribe((event) => {
    if (event.action === 'beforeCreate') {
      const current = strapi.plugin(pluginId)
      console.log("plugin", current)
    }
  })
};
