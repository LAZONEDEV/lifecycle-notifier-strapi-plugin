import instance from "../utils/axios";
import { subscriptionCollectionUid } from "../../../common/constants/index"
import { SubscriptionEntry } from "../../../common/types/index";

export class SubscriptionService {
  static async get(){
    const subs =  await instance.get(`/content-manager/collection-types/${subscriptionCollectionUid}`);
    return subs.data.results as SubscriptionEntry []
  }
}