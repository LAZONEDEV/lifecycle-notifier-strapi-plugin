import { SubscriptionEntry } from '../common/types/index';
import { apiRoutes } from '../constants/apiRoutes';
import instance from '../utils/fetchInstance';

export class SubscriptionService {
  static baseUrl = apiRoutes.pluginSubscriptions;
  static async get(token: string) {
    const subs = await instance.withAuthGet(SubscriptionService.baseUrl, token);
    return subs.results as SubscriptionEntry[];
  }

  static async create(data: Omit<SubscriptionEntry, 'id'>, token: string) {
    const result = await instance.withAuthPost<SubscriptionEntry>(
      SubscriptionService.baseUrl,
      token,
      data
    );
    return result;
  }

  static async delete(id: string, token: string) {
    const result = await instance.withAuthDelete(`${SubscriptionService.baseUrl}/${id}`, token);
    return result.data;
  }

  static async update(id: string, data: Omit<SubscriptionEntry, 'id'>, token: string) {
    const result = await instance.withAuthPut(`${SubscriptionService.baseUrl}/${id}`, token, data);
    return result.data;
  }
}
