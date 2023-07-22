/**
 * actualite service
 */

import { factories } from '@strapi/strapi';
import { subscriptionCollectionUid } from '../../common/constants/index';

export default factories.createCoreService(subscriptionCollectionUid as any);
