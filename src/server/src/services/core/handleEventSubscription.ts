import { EventType } from '../../../../common/enums';
import { listenedCollection } from '../../constants/listenedCollection';
import { getSubscriptionsForCollection } from '../../helpers/getSubsForCollection';
import { CollectionEntry, Context } from '../../types';
import { notifyForSubscription } from './notifyForSubscription';

export const handleEventSubscription = async (event: Context, result: Record<string, any>) => {
  const shouldSendNotification = listenedCollection.has(event.uid);

  if (!shouldSendNotification) {
    return;
  }

  const collectionUid = event.uid;

  const relatedSubscriptions = await getSubscriptionsForCollection(
    collectionUid,
    event.action as EventType
  );

  const createdEntry = {
    documentId: result.documentId,
    ...event.params.data,
  };

  for (const relatedSubscription of relatedSubscriptions) {
    notifyForSubscription(relatedSubscription, createdEntry as CollectionEntry);
  }
};
