import { SubscriptionEntry } from '../common/types/index';
import { apiRoutes } from '../constants/apiRoutes';
import instance from '../utils/fetchInstance';

export class SubscriptionService {
  static baseUrl = apiRoutes.pluginSubscriptions;
  static async get(token: string) {
    const subs = await instance.get(SubscriptionService.baseUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return subs.results as SubscriptionEntry[];
  }

  static async create(data: Omit<SubscriptionEntry, 'id'>, token: string) {
    const result = await instance.post<SubscriptionEntry>(SubscriptionService.baseUrl, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result;
  }

  static async delete(id: string, token: string) {
    const result = await instance.delete(`${SubscriptionService.baseUrl}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  }

  static async update(id: string, data: Omit<SubscriptionEntry, 'id'>, token: string) {
    const result = await instance.put(`${SubscriptionService.baseUrl}/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  }
}
