import { validate } from "jsonschema";
import { SubscriptionEntry } from "../../../common/types";
import pluginId from "../../../common/utils/pluginId";
import { ConfigKeys, PluginStoreKeys } from "../types";
import { subscriptionsSchema } from "../utils/configValidator";
import checkExistingSubs from "./checkExistingSubs";
import { getPluginConfig } from "./getPluginConfig";
import { insertSubscription } from "./insertSubscription";
import { getFromStore, saveInStore } from "./pluginStore";

export const loadSubsFromPluginConfig = async () => {
  const subs = getPluginConfig(ConfigKeys.SUBSCRIPTIONS);
  if (!subs) {
    return;
  }

  const alreadyLoaded = await getFromStore(PluginStoreKeys.POPULATED);
  if (alreadyLoaded) {
    return;
  }

  const validationResult = validate(subs, subscriptionsSchema);
  if (validationResult.errors.length) {
    console.error(`
    The subscriptions you provided in the ${pluginId} configs fail validation, errors are below:
    ${validationResult.errors.map((error) => error.stack)}
    `);
    return;
  }

  try {
    for (const subscription of subs as SubscriptionEntry[]) {
      const alreadyExists = await checkExistingSubs(subscription);
      if (!alreadyExists) {
        await insertSubscription(subscription);
      }
    }
    await saveInStore(PluginStoreKeys.POPULATED, true);
  } catch (error) {
    console.error(
      `
    The error below occur while loading the subscription from the plugin config
    `,
      error
    );
  }
};
