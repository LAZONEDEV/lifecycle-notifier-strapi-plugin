import { subscriptionCollectionUid } from '../../common/constants';
import { SubscriptionEntry } from '../../common/types';
import { listenedCollection } from '../../constants/listenedCollection';
import { getStrapi } from '../../helpers/getStrapi';

export const loadExistingSubscriptions = async () => {
  const strapi = getStrapi();

  const subscriptionRecords: SubscriptionEntry[] = await strapi.db
    .query(subscriptionCollectionUid)
    .findMany({});

  subscriptionRecords.forEach((record) => {
    listenedCollection.add(record.collectionName);
  });
};
