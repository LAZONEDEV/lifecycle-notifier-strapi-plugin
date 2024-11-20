import { apiRoutes } from '../constants/apiRoutes';
import fetchInstance from '../utils/fetchInstance';

export class ConfigService {
  static async getEnvRecipients() {
    const result = await fetchInstance.get<string[]>(apiRoutes.pluginEnvRecipients);
    return result;
  }
}
