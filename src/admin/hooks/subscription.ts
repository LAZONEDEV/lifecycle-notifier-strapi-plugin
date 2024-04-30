import { useEffect, useState } from "react";
import { SubscriptionEntry } from "../../common/types";
import { SubscriptionService } from "../services/Subscription";

export const useSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSubs = () => {
    setLoading(true);
    SubscriptionService.get()
      .then((res) => setSubscriptions(res))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadSubs();
  }, []);

  return { subscriptions, loading, reload: loadSubs };
};
