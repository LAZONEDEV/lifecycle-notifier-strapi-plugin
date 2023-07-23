import instance from "../utils/axios";
import { subscriptionCollectionUid } from "../../../common/constants/index";
import { SubscriptionEntry } from "../../../common/types/index";

export class SubscriptionService {
  static baseUrl = `/content-manager/collection-types/${subscriptionCollectionUid}`;
  static async get() {
    const subs = await instance.get(SubscriptionService.baseUrl);
    return subs.data.results as SubscriptionEntry[];
  }

  static async create(data: Omit<SubscriptionEntry, "id">) {
    const result = await instance.post<SubscriptionEntry>(SubscriptionService.baseUrl, data);
    return result.data;
  }

  static async delete (id: string){
    const result = await instance.delete(`${SubscriptionService.baseUrl}/${id}`)
    return result.data
  }

  static async update (id: string, data: Omit<SubscriptionEntry, "id">){
    const result = await instance.put(`${SubscriptionService.baseUrl}/${id}`,data)
    return result.data
  }
}
