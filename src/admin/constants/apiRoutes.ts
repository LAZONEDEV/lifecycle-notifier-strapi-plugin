import { subscriptionCollectionUid } from "../../common/constants";

export const apiRoutes = {
  contentTypes: "/content-manager/content-types",
  pluginEnvRecipients: "/lifecycle-notifier/env-recipients",
  pluginInterceptors: "/lifecycle-notifier/interceptors",
  pluginSubscriptions: `/content-manager/collection-types/${subscriptionCollectionUid}`,
};
