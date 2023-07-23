import pluginId from "../../common/utils/pluginId";
import { PluginStoreKeys, StrapiStore } from "../types";

export const getPluginStore = (key: string): StrapiStore => {
  return strapi.store({
    key,
    name: pluginId,
    type: "plugin",
  });
};

export const getFromStore = async (key: PluginStoreKeys) => {
  const store = getPluginStore(key);
  const value = await store.get();
  return value;
};

export const saveInStore = async (key: PluginStoreKeys, value: any) => {
  const store = getPluginStore(key);
  store.set({ value });
};