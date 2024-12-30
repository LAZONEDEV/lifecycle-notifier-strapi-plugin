import type { SubscriberFn } from '@strapi/database/dist/lifecycles';
import { EventType } from '../../../../common/enums';
import { listenedCollection } from '../../constants/listenedCollection';
import { getSubscriptionsForCollection } from '../../helpers/getSubsForCollection';
import { CollectionEntry } from '../../types';
import { notifyForSubscription } from './notifyForSubscription';

export const handleEventSubscription: SubscriberFn = async (event) => {
  const willSendNotification = listenedCollection.has(event.model.uid);

  if (!willSendNotification) {
    return;
  }

  const collectionUid = event.model.uid;

  const createdEntry = event.result || event.params.data;

  const relatedSubscriptions = await getSubscriptionsForCollection(
    collectionUid,
    event.action as EventType
  );

  for (const relatedSubscription of relatedSubscriptions) {
    notifyForSubscription(relatedSubscription, createdEntry as CollectionEntry);
  }
};
