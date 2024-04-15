import { listenedCollection } from "../../constants/listenedCollection";
import { EventType } from "../../../common/enums";
import type { SubscriberFn } from "@strapi/database/lib/lifecycles/subscribers";
import { getSubscriptionsForCollection } from "../../helpers/getSubsForCollection";
import { CollectionEntry } from "../../types";
import { updateListenedCollectionOnChangeOnSubsCollection } from "./updateListenedCollectionSet";
import { getStrapi } from "../../helpers/getStrapi";
import { notifyForSubscription } from "./notifyForSubscription";


export const listenSubscriptionCollectionUpdate = async () => {
  const strapi = getStrapi()

  strapi.db.lifecycles.subscribe(
    updateListenedCollectionOnChangeOnSubsCollection
  );
};

export const handleEventSubscription: SubscriberFn = async (event) => {
  const willSendNotification = !!(
    listenedCollection.has(event.model.uid) && new Set(Object.values(EventType))
  );

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



export const listenChangeOnCollection = async () => {
  const strapi = getStrapi()
  
  // @ts-ignore
  strapi.db.lifecycles.subscribe({
    async afterCreate(event) {
      handleEventSubscription(event);
    },
  });
};
