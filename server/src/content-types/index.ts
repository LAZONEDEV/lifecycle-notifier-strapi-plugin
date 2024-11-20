import { subscriptionCollectionName } from '../common/constants/index';
import subscription from './subscription';

export default {
  [subscriptionCollectionName]: { schema: subscription },
};
