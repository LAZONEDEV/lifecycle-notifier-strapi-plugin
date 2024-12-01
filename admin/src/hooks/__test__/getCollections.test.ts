import { act, renderHook } from '@testing-library/react';
import { resolveWithDelay } from '../../testUtils/resolveWithDelay';
import { CollectionSchema } from '../../types';
import { filterApiCollection, loadCollectionsSchemas } from '../../utils/loadCollections';
import { useCollections } from '../getCollections';

const mockedCollections = [
  {
    uid: '1',
  },
  {
    uid: '2',
  },
] as CollectionSchema[];

jest.mock('../../utils/loadCollections', () => ({
  loadCollectionsSchemas: jest.fn(),
  filterApiCollection: jest.fn(),
}));

const waitingTime = 2000;
// wait for 2 seconds before resolving
// to be able to checked if the loading state has changed
const mockResponsePromise = resolveWithDelay(waitingTime, mockedCollections);
const mockToken = 'test-token';

describe('test suite for useCollections hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set loading state to true at starting', async () => {
    (loadCollectionsSchemas as jest.Mock).mockReturnValue([mockResponsePromise, () => void 0]);

    let result: {
      current: ReturnType<typeof useCollections>;
    };

    await act(async () => {
      const renderResult = renderHook(() => useCollections(mockToken));
      result = renderResult.result;
    });

    expect(result!.current.loading).toBe(true);
  });

  it('should return loaded subscriptions and set loading state to false', async () => {
    const requestMock = jest.fn().mockResolvedValue(mockedCollections);
    (loadCollectionsSchemas as jest.Mock).mockReturnValue([requestMock(), () => void 0]);
    (filterApiCollection as jest.Mock).mockReturnValue(mockedCollections);

    let result: {
      current: ReturnType<typeof useCollections>;
    };

    await act(async () => {
      const renderResult = renderHook(() => useCollections(mockToken));
      result = renderResult.result;
    });

    expect(loadCollectionsSchemas).toHaveBeenCalledTimes(1);
    expect(result!.current.loading).toBe(false);
    expect(result!.current.collections).toEqual(mockedCollections);
  });

  it('should cancel request on unmount', async () => {
    const requestMock = jest.fn().mockResolvedValue(mockedCollections);
    const cancelRequest = jest.fn();
    (loadCollectionsSchemas as jest.Mock).mockReturnValue([requestMock(), cancelRequest]);
    (filterApiCollection as jest.Mock).mockReturnValue(mockedCollections);

    const { unmount } = renderHook(() => useCollections(mockToken));
    // unmount the component to cancel the request
    unmount?.()!;

    expect(cancelRequest).toHaveBeenCalledTimes(1);
  });
});
