import pluginId from "../../common/utils/pluginId";
import { ConfigKeys, PluginConfigs } from "../types";

export const getPluginConfigs = () => {
  const config = strapi.config.get(`plugin.${pluginId}`);
  return config as PluginConfigs;
};

export const getPluginConfig = (key: ConfigKeys) => {
  const configs = getPluginConfigs()
  return configs[key]
}
