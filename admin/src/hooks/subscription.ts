import { useEffect, useState } from 'react';
import { SubscriptionEntry } from '../common/types';
import { SubscriptionService } from '../services/Subscription';

export const useSubscriptions = (token: string) => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSubs = () => {
    setLoading(true);
    SubscriptionService.get(token)
      .then((res) => setSubscriptions(res))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadSubs();
  }, []);

  return { subscriptions, loading, reload: loadSubs };
};
