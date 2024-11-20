import { CollectionEntry } from '../../../types';
import { getEntryWithRelation } from '../../../helpers/getEntryWithRelation';
import { notify } from '../../../helpers/notify';
import { SubscriptionEntry } from '../../../../common/types';
import { EventType, RecipientType } from '../../../../common/enums';
import { notifyForSubscription } from '../notifyForSubscription';

jest.mock('../../../helpers/notify', () => ({
  notify: jest.fn().mockResolvedValue(void 0),
}));
jest.mock('../../../helpers/getEntryWithRelation', () => ({
  getEntryWithRelation: jest.fn(),
}));

describe('Unit test for notifyForSubscription service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const testEntry: CollectionEntry = {
    id: 'testEntry',
  };

  const subscription: SubscriptionEntry = {
    id: 'testSubscription',
    subject: 'testSubject',
    collectionName: 'testCollectionName',
    eventType: EventType.AfterCreate,
    recipients: [
      {
        type: RecipientType.CUSTOM,
        value: 'testValue',
      },
    ],
    content: 'testContent',
    mediaFields: ['testMediaField'],
  };

  it('should try to load relations before sending notification when mediaFields is defined', async () => {
    (getEntryWithRelation as jest.Mock).mockResolvedValue(testEntry);
    await notifyForSubscription(subscription, testEntry);

    expect(getEntryWithRelation).toHaveBeenCalledWith(
      subscription.collectionName,
      testEntry,
      subscription.mediaFields
    );
  });

  it('should try to load relations before sending notification when there are relation to populate', async () => {
    const relations = ['testRelation'];

    (getEntryWithRelation as jest.Mock).mockResolvedValue(testEntry);
    const subscriptionWithoutMedia = {
      ...subscription,
      mediaFields: [],
      relations,
    };
    await notifyForSubscription(subscriptionWithoutMedia, testEntry);

    expect(getEntryWithRelation).toHaveBeenCalledWith(
      subscription.collectionName,
      testEntry,
      relations
    );
  });

  it('should trigger notification sending', async () => {
    (getEntryWithRelation as jest.Mock).mockResolvedValue(testEntry);
    await notifyForSubscription(subscription, testEntry);

    expect(notify).toHaveBeenCalledWith(subscription, subscription.recipients[0], testEntry);
  });

  it('should not do nothing when entity record not found', async () => {
    (getEntryWithRelation as jest.Mock).mockResolvedValue(undefined);
    await notifyForSubscription(subscription, testEntry);
    expect(notify).not.toHaveBeenCalled();
  });

  it('should log error when notification failed', async () => {
    (getEntryWithRelation as jest.Mock).mockResolvedValue(testEntry);
    (notify as jest.Mock).mockRejectedValue(new Error('testError'));
    jest.spyOn(console, 'error').mockImplementation(() => {});

    await notifyForSubscription(subscription, testEntry);

    expect(console.error).toHaveBeenCalled();
  });

  it('should log error when other exception occurs', async () => {
    const error = new Error('testError');
    (getEntryWithRelation as jest.Mock).mockRejectedValue(error);
    jest.spyOn(console, 'error');

    await notifyForSubscription(subscription, testEntry);
    expect(console.error).toHaveBeenCalledWith(error);
  });
});
