import { subscriptionCollectionUid } from '../../../../common/constants';
import { SubscriptionEntry } from '../../../../common/types';
import { listenedCollection } from '../../constants/listenedCollection';
import { getSubscriptionsForCollection } from '../../helpers/getSubsForCollection';
import { Context } from '../../types';

/**
 * This handle update the `listenedCollection` constant when update
 * is done on subscription collection. It intend to keep `listenedCollection`
 * up to date.
 *
 * @param event Event
 * @returns void
 */
export const updateListenedCollectionOnChangeOnSubsCollection = async (event: Context) => {
  const isModifyingEvent = ['create', 'delete'].includes(event.action);
  if (!isModifyingEvent) {
    return;
  }

  const isSubscriptionCollection = event.uid === subscriptionCollectionUid;
  if (!isSubscriptionCollection) {
    return;
  }

  const collectionName = (event?.params?.data as unknown as SubscriptionEntry)?.collectionName;

  if (!collectionName) return;

  if (event.action === 'delete') {
    const existing = await getSubscriptionsForCollection(collectionName);
    if (!existing.length) {
      listenedCollection.delete(collectionName);
    }
  } else {
    listenedCollection.add(collectionName);
  }
};
