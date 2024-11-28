import { apiRoutes } from '../constants/apiRoutes';
import fetchInstance from '../utils/fetchInstance';

export class InterceptorService {
  static async getInterceptors(authToken: string) {
    const result = await fetchInstance.withAuthGet(apiRoutes.pluginInterceptors, authToken);

    return result as string[];
  }
}
