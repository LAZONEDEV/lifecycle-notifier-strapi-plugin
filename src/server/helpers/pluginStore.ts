import pluginId from "../../common/utils/pluginId";
import { PluginStoreKeys, StrapiStore } from "../types";
import { getStrapi } from "./getStrapi";

export const getPluginStore = (key: string): StrapiStore => {
  const strapi = getStrapi();
  return strapi.store({
    key,
    name: pluginId,
    type: "plugin",
  });
};

export const getFromStore = async (key: PluginStoreKeys) => {
  const store = getPluginStore(key);
  const value = await store.get({});
  return value;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveInStore = async (key: PluginStoreKeys, value: any) => {
  const store = getPluginStore(key);
  store.set({ value });
};
