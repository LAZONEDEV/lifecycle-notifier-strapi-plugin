import pluginId from "../../common/utils/pluginId";
import { ConfigKeys, PluginConfigs } from "../types";
import { getStrapi } from "./getStrapi";

export const getPluginConfigs = () => {
  const strapi = getStrapi()
  const config = strapi.config.get(`plugin.${pluginId}`);
  return config as PluginConfigs;
};

export const getPluginConfig = (key: ConfigKeys) => {
  const configs = getPluginConfigs()
  return configs[key]
}
