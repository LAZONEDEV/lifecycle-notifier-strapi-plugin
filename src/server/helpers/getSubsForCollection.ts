import { subscriptionCollectionUid } from "../../common/constants";
import { SubscriptionEntry } from "../../common/types";

export const getSubscriptionsForCollection = async (
  collectionUid: string
): Promise<SubscriptionEntry[]> => {
  return await strapi.db
    .query(subscriptionCollectionUid)
    .findMany({ where: { collectionName: collectionUid } });
};
