import { subscriptionCollectionUid } from '../../../common/constants';
import { EventType } from '../../../common/enums';
import { getStrapi } from './getStrapi';

export const getSubscriptionsForCollection = async (collectionUid: string, action?: EventType) => {
  const strapi = getStrapi();

  const filterQuery: Record<string, string> = { collectionName: collectionUid };

  if (action) {
    filterQuery.eventType = action;
  }

  return await strapi.documents(subscriptionCollectionUid).findMany({
    filters: { ...filterQuery },
  });
};
