import { loadSubsFromPluginConfig } from "./helpers/loadSubsFromPluginConfig";
import {
  listenChangeOnCollection,
  listenCollectionUpdate,
  loadExistingSubscriptions,
} from "./services/core/listenedCollectionUpdater";

export default async () => {
  listenCollectionUpdate();
  await loadExistingSubscriptions();
  listenChangeOnCollection();
  loadSubsFromPluginConfig()
};
