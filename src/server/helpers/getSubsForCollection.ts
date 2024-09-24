import { subscriptionCollectionUid } from "../../common/constants";
import { EventType } from "../../common/enums";
import { SubscriptionEntry } from "../../common/types";
import { getStrapi } from "./getStrapi";

export const getSubscriptionsForCollection = async (
  collectionUid: string,
  action?: EventType,
): Promise<SubscriptionEntry[]> => {
  const strapi = getStrapi()

  const filterQuery: Record<string, string> = { collectionName: collectionUid }

  if(action){
    filterQuery.eventType = action;
  }

  return await strapi.db
    .query(subscriptionCollectionUid)
    .findMany({ where: filterQuery });
};
