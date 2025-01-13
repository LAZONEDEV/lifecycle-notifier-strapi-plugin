import { getPluginConfigs } from '../helpers/getPluginConfig';
import { ConfigKeys } from '../types';

const getInterceptors = () => {
  const config = getPluginConfigs();
  const interceptors = config[ConfigKeys.INTERCEPTORS] || [];

  return interceptors.map((interceptor) => interceptor.name);
};

const interceptorsService = {
  getInterceptors,
};

export type InterceptorsServiceApi = typeof interceptorsService;

export default () => interceptorsService;
