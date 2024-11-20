import { validate } from 'jsonschema';
import { ConfigKeys, PluginStoreKeys } from '../types';
import { getPluginConfig } from './getPluginConfig';
import { getFromStore, saveInStore } from './pluginStore';
import { subscriptionsSchema } from '../utils/configValidator';
import pluginId from '../common/utils/pluginId';
import { insertSubscription } from './insertSubscription';
import { SubscriptionEntry } from '../common/types';

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
      await insertSubscription(subscription);
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
