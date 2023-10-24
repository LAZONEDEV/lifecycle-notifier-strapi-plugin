import { Strapi } from "@strapi/strapi";
import pluginId from "../../common/utils/pluginId";
import { InterceptorsServiceApi } from "../services/interceptor";

export default ({ strapi }: { strapi: Strapi }) => ({
  getInterceptors(ctx) {
    const service = strapi
      .plugin(pluginId)
      .service("interceptor") as InterceptorsServiceApi;

    const result = service.getInterceptors();
    ctx.body = result;
  },
});
