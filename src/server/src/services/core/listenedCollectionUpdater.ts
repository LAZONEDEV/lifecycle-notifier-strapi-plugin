import { getStrapi } from '../../helpers/getStrapi';
import { handleEventSubscription } from './handleEventSubscription';
import { updateListenedCollectionOnChangeOnSubsCollection } from './updateListenedCollectionSet';

export const listenSubscriptionCollectionUpdate = async () => {
  const strapi = getStrapi();

  strapi.db.lifecycles.subscribe(updateListenedCollectionOnChangeOnSubsCollection);
};

export const listenChangeOnCollection = async () => {
  const strapi = getStrapi();

  // @ts-ignore
  strapi.db.lifecycles.subscribe({
    async afterCreate(event) {
      handleEventSubscription(event);
    },
  });

  // @ts-ignore
  strapi.db.lifecycles.subscribe({
    async afterUpdate(event) {
      handleEventSubscription(event);
    },
  });

  // @ts-ignore
  strapi.db.lifecycles.subscribe({
    async afterDelete(event) {
      handleEventSubscription(event);
    },
  });
};
