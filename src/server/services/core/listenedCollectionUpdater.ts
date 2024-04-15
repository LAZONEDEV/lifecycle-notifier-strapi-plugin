
import { updateListenedCollectionOnChangeOnSubsCollection } from "./updateListenedCollectionSet";
import { getStrapi } from "../../helpers/getStrapi";
import { handleEventSubscription } from "./handleEventSubscription";

export const listenSubscriptionCollectionUpdate = async () => {
  const strapi = getStrapi()

  strapi.db.lifecycles.subscribe(
    updateListenedCollectionOnChangeOnSubsCollection
  );
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
