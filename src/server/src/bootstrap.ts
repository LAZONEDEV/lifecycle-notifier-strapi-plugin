import { loadExistingSubscriptions } from './services/core/loadExistingSubscriptions';
import { updateListenedCollectionOnChangeOnSubsCollection } from './services/core/updateListenedCollectionSet';

export default () => {
  strapi.documents.use(async (context, next) => {
    const result = await next();
    await updateListenedCollectionOnChangeOnSubsCollection(context);
    return result;
  });

  strapi.documents.use(async (_, next) => {
    const result = await next();
    await loadExistingSubscriptions();
    return result;
  });
};
