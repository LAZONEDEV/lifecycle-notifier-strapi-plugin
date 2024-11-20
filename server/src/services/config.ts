import { getPluginConfigs } from '../helpers/getPluginConfig';
import { ConfigKeys } from '../types';

const getRecipientConfig = () => {
  const config = getPluginConfigs();
  return config[ConfigKeys.ENV_RECIPIENT];
};

const configService = {
  getRecipientConfig,
};

export type ConfigServiceApi = typeof configService;

export default () => configService;
