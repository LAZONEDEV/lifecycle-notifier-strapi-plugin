/**
 * article controller
 */

import { factories } from '@strapi/strapi'
import { subscriptionCollectionUid } from "../../common/constants/index"

export default factories.createCoreController(subscriptionCollectionUid as any);