import { loadSubsFromPluginConfig } from "./helpers/loadSubsFromPluginConfig";
import {
  listenChangeOnCollection,
  listenSubscriptionCollectionUpdate,
} from "./services/core/listenedCollectionUpdater";
import { loadExistingSubscriptions } from "./services/core/loadExistingSubscriptions";

export default async () => {
  listenSubscriptionCollectionUpdate();
  await loadExistingSubscriptions();
  listenChangeOnCollection();
  loadSubsFromPluginConfig()
};
