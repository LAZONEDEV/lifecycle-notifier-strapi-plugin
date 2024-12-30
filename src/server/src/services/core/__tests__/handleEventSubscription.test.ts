import { Event } from '@strapi/database/dist/lifecycles/index';
import { SubscriptionEntry } from '../../../../common/types';
import { listenedCollection } from '../../../constants/listenedCollection';
import { getSubscriptionsForCollection } from '../../../helpers/getSubsForCollection';
import { handleEventSubscription } from '../handleEventSubscription';
import { notifyForSubscription } from '../notifyForSubscription';

jest.mock('../../../helpers/getSubsForCollection', () => ({
  getSubscriptionsForCollection: jest.fn(),
}));

jest.mock('../../../services/core/notifyForSubscription.ts', () => ({
  notifyForSubscription: jest.fn(),
}));

jest.mock('../../../constants/listenedCollection', () => ({
  listenedCollection: {
    has: jest.fn(),
  },
}));

describe('test suite for handleEventSubscription', () => {
  const event = {
    model: {
      uid: 'testModelUid',
    },
    params: {
      data: {},
    },
    result: {},
  } as Event;

  const subscription = {
    id: 'testSubscription',
  } as SubscriptionEntry;

  it('should trigger the sending of a notification', async () => {
    (getSubscriptionsForCollection as jest.Mock).mockResolvedValue([subscription]);
    (listenedCollection.has as jest.Mock).mockReturnValue(true);
    (notifyForSubscription as jest.Mock).mockResolvedValue(void 0);

    await handleEventSubscription(event);

    expect(listenedCollection.has).toHaveBeenCalledWith(event.model.uid);
    expect(getSubscriptionsForCollection).toHaveBeenCalledWith(event.model.uid);
    expect(notifyForSubscription).toHaveBeenCalledWith(subscription, event.result);

    jest.clearAllMocks();
  });

  it('should use params.data when result is not defined', async () => {
    (getSubscriptionsForCollection as jest.Mock).mockResolvedValue([subscription]);
    (listenedCollection.has as jest.Mock).mockReturnValue(true);
    (notifyForSubscription as jest.Mock).mockResolvedValue(void 0);

    await handleEventSubscription({
      ...event,
      result: undefined,
    });

    expect(listenedCollection.has).toHaveBeenCalledWith(event.model.uid);
    expect(getSubscriptionsForCollection).toHaveBeenCalledWith(event.model.uid);
    expect(notifyForSubscription).toHaveBeenCalledWith(subscription, event.result);

    jest.clearAllMocks();
  });

  it('should not trigger the sending of a notification', async () => {
    (getSubscriptionsForCollection as jest.Mock).mockResolvedValue([]);
    (listenedCollection.has as jest.Mock).mockReturnValue(false);
    (notifyForSubscription as jest.Mock).mockResolvedValue(void 0);

    await handleEventSubscription(event);

    expect(getSubscriptionsForCollection).not.toHaveBeenCalled();
    expect(notifyForSubscription).not.toHaveBeenCalled();
  });
});
