import { apiRoutes } from '../constants/apiRoutes';
import fetchInstance from '../utils/fetchInstance';

export class InterceptorService {
  static async getInterceptors() {
    const result = await fetchInstance.get(apiRoutes.pluginInterceptors);

    return result as string[];
  }
}
