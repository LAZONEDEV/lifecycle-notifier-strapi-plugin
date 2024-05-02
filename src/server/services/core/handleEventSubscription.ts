import { notifyForSubscription } from "./notifyForSubscription";
import { listenedCollection } from "../../constants/listenedCollection";
import type { SubscriberFn } from "@strapi/database/lib/lifecycles/subscribers";
import { getSubscriptionsForCollection } from "../../helpers/getSubsForCollection";
import { CollectionEntry } from "../../types";

export const handleEventSubscription: SubscriberFn = async (event) => {
  const willSendNotification = listenedCollection.has(event.model.uid);

  if (!willSendNotification) {
    return;
  }

  const collectionUid = event.model.uid;
  const createdEntry = event.result || event.params.data;

  const relatedSubscriptions = await getSubscriptionsForCollection(
    collectionUid
  );

  for (const relatedSubscription of relatedSubscriptions) {
    notifyForSubscription(relatedSubscription, createdEntry as CollectionEntry);
  }
};
