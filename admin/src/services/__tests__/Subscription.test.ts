import { SubscriptionEntry } from '../../common/types';
import instance from '../../utils/fetchInstance';
import { SubscriptionService } from '../Subscription';

jest.mock('../../utils/fetchInstance', () => ({
  __esModule: true,
  default: {
    withAuthGet: jest.fn(),
    withAuthPost: jest.fn(),
    withAuthDelete: jest.fn(),
    withAuthPut: jest.fn(),
  },
}));

const mockToken = 'test-token';

describe('suite test for Subscription service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockSubscriptionEntry = {
    id: '1',
  } as SubscriptionEntry;

  it('should get subscriptions with API call', async () => {
    const mockResult = { results: [mockSubscriptionEntry] };
    (instance.withAuthGet as jest.Mock).mockResolvedValueOnce(mockResult);

    const result = await SubscriptionService.get(mockToken);

    expect(instance.withAuthGet).toHaveBeenCalledWith(SubscriptionService.baseUrl, mockToken);
    expect(result).toEqual([mockSubscriptionEntry]);
  });

  it('should create a subscription with API call', async () => {
    (instance.withAuthPost as jest.Mock).mockResolvedValueOnce(mockSubscriptionEntry);

    const result = await SubscriptionService.create(mockSubscriptionEntry, mockToken);

    expect(instance.withAuthPost).toHaveBeenCalledWith(
      SubscriptionService.baseUrl,
      mockToken,
      mockSubscriptionEntry
    );
    expect(result).toEqual(mockSubscriptionEntry);
  });

  it('should delete a subscription with API call', async () => {
    const id = '1';
    const mockDeleteResult = { data: 'deleted' };
    (instance.withAuthDelete as jest.Mock).mockResolvedValueOnce(mockDeleteResult);

    const result = await SubscriptionService.delete(id, mockToken);

    expect(instance.withAuthDelete).toHaveBeenCalledWith(
      `${SubscriptionService.baseUrl}/${id}`,
      mockToken
    );
    expect(result).toEqual('deleted');
  });

  it('should update a subscription with API call', async () => {
    const id = '1';
    const mockUpdateData = {} as Omit<SubscriptionEntry, 'id'>;
    const mockUpdateResult = { data: 'updated' };
    (instance.withAuthPut as jest.Mock).mockResolvedValueOnce(mockUpdateResult);

    const result = await SubscriptionService.update(id, mockUpdateData, mockToken);

    expect(instance.withAuthPut).toHaveBeenCalledWith(
      `${SubscriptionService.baseUrl}/${id}`,
      mockToken,
      mockUpdateData
    );
    expect(result).toEqual('updated');
  });
});
