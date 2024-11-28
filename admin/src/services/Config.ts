import { apiRoutes } from '../constants/apiRoutes';
import fetchInstance from '../utils/fetchInstance';

export class ConfigService {
  static async getEnvRecipients(authToken: string) {
    const result = await fetchInstance.withAuthGet<string[]>(
      apiRoutes.pluginEnvRecipients,
      authToken
    );
    return result;
  }
}
