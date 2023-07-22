import pluginId from "../../common/utils/plugin";
import { PluginStoreKeys, StrapiStore } from "../types";

const getPluginStore = (): StrapiStore => {
  return strapi.store({
    name: pluginId,
    type: "plugin",
  });
};

const getPluginSettings = () => {
  const store = getPluginStore();
  return store.get(PluginStoreKeys.SETTINGS);
};

const setDefaultSubsPopulated = () => {
  const store = getPluginStore();
  return store.set(PluginStoreKeys.POPULATED, true);
}

export default () => ({
  getPluginStore,
  getPluginSettings,
  setDefaultSubsPopulated,
});
