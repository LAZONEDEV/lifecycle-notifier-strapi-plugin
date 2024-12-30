import { renderHook, act } from '@testing-library/react';
import { useInterceptorsOptions } from '../interceptors';
import { InterceptorService } from '../../services/Interceptor';

jest.mock('../../services/Interceptor', () => ({
  InterceptorService: {
    getInterceptors: jest.fn(),
  },
}));

const mockEnvInterceptors = ['interception1', 'interception2'];

describe('test suite for useInterceptorsOptions hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch interceptors', async () => {
    (InterceptorService.getInterceptors as jest.Mock).mockResolvedValue(mockEnvInterceptors);
    const expectedResult = mockEnvInterceptors.map((interceptor) => ({
      name: interceptor,
      value: interceptor,
    }));
    const { rerender, result } = renderHook(() => useInterceptorsOptions());

    await act(async () => {
      rerender();
    });

    expect(result!.current).toEqual(expectedResult);
  });

  it('should log error when failed to fetch interceptors', async () => {
    const mockedError = new Error('Failed to fetch interceptors');
    (InterceptorService.getInterceptors as jest.Mock).mockImplementation(() => {
      throw mockedError;
    });
    const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => void 0);

    renderHook(() => useInterceptorsOptions());

    expect(mockConsoleError).toHaveBeenCalledWith(mockedError);
  });
});
