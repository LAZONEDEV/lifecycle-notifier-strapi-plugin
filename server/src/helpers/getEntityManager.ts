import { subscriptionCollectionUid } from '../common/constants';
import { getStrapi } from './getStrapi';

export const getCollectionEntityManager = (collectionUid: string) => {
  const strapi = getStrapi();
  return strapi.db.query(collectionUid);
};

export const getSubscriptionEntityManager = () => {
  return getCollectionEntityManager(subscriptionCollectionUid);
};

export const getMediaFileEntityManager = () => {
  return getCollectionEntityManager('plugin::upload.file');
};
