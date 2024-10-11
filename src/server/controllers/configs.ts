import { Core } from "@strapi/strapi";
import pluginId from "../../common/utils/pluginId";
import { ConfigServiceApi } from "../services/config";

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  envRecipients(ctx) {
    const service = strapi
      .plugin(pluginId)
      .service("config") as ConfigServiceApi;

    const result = service.getRecipientConfig();
    ctx.body = result;
  },
  index() {
    return pluginId;
  },
});
