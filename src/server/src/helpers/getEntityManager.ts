import { subscriptionCollectionUid } from '../../../common/constants';
import { getStrapi } from './getStrapi';

export const getCollectionEntityManager = (collectionUid) => {
  const strapi = getStrapi();
  return strapi.documents(collectionUid);
};

export const getSubscriptionEntityManager = () => {
  return getCollectionEntityManager(subscriptionCollectionUid);
};

export const getMediaFileEntityManager = () => {
  return getCollectionEntityManager('plugin::upload.file');
};
