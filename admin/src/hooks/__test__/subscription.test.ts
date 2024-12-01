import { act, renderHook } from '@testing-library/react';
import { SubscriptionService } from '../../services/Subscription';
import { resolveWithDelay } from '../../testUtils/resolveWithDelay';
import { useSubscriptions } from '../subscription';

jest.mock('../../services/Subscription', () => ({
  SubscriptionService: {
    get: jest.fn(),
  },
}));

const mockSubscriptions = [{ id: '1' }];
const waitingTime = 2000;
// wait for 2 seconds before resolving
// to be able to checked if the loading state
const mockResponsePromise = resolveWithDelay(waitingTime, mockSubscriptions);

const mockToken = 'test-token';

describe('test suite for useSubscriptions hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch subscriptions and set loading state to true at starting', async () => {
    (SubscriptionService.get as jest.Mock).mockReturnValue(mockResponsePromise);

    let result: {
      current: ReturnType<typeof useSubscriptions>;
    };

    await act(async () => {
      const renderResult = renderHook(() => useSubscriptions(mockToken));
      result = renderResult.result;
    });

    expect(result!.current.loading).toBe(true);
    expect(SubscriptionService.get).toHaveBeenCalledTimes(1);
  });

  it('should return loaded subscriptions and set loading state to false', async () => {
    (SubscriptionService.get as jest.Mock).mockResolvedValue(mockSubscriptions);

    let result: {
      current: ReturnType<typeof useSubscriptions>;
    };

    await act(async () => {
      const renderResult = renderHook(() => useSubscriptions(mockToken));
      result = renderResult.result;
    });

    expect(SubscriptionService.get).toHaveBeenCalledTimes(1);
    expect(result!.current.loading).toBe(false);
    expect(result!.current.subscriptions).toEqual(mockSubscriptions);
  });

  it('should refresh when reload function is called', async () => {
    (SubscriptionService.get as jest.Mock).mockResolvedValueOnce([]);

    const { result } = renderHook(() => useSubscriptions(mockToken));

    expect(result.current.subscriptions).toEqual([]);

    (SubscriptionService.get as jest.Mock).mockResolvedValueOnce(mockSubscriptions);

    await act(async () => {
      result.current.reload();
    });

    expect(result.current.subscriptions).toEqual(mockSubscriptions);
  });
});
