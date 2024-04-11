import { loadSubsFromPluginConfig } from "./helpers/loadSubsFromPluginConfig";
import {
  listenChangeOnCollection,
  listenSubscriptionCollectionUpdate,
  loadExistingSubscriptions,
} from "./services/core/listenedCollectionUpdater";

export default async () => {
  listenSubscriptionCollectionUpdate();
  await loadExistingSubscriptions();
  listenChangeOnCollection();
  loadSubsFromPluginConfig()
};
