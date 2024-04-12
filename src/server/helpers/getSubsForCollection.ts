import { subscriptionCollectionUid } from "../../common/constants";
import { SubscriptionEntry } from "../../common/types";
import { getStrapi } from "./getStrapi";

export const getSubscriptionsForCollection = async (
  collectionUid: string
): Promise<SubscriptionEntry[]> => {
  const strapi = getStrapi()

  return await strapi.db
    .query(subscriptionCollectionUid)
    .findMany({ where: { collectionName: collectionUid } });
};
