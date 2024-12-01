import { apiRoutes } from '../../constants/apiRoutes';
import fetchInstance from '../../utils/fetchInstance';
import { InterceptorService } from '../Interceptor';

jest.mock('../../utils/fetchInstance', () => ({
  __esModule: true,
  default: {
    withAuthGet: jest.fn(),
  },
}));

const mockToken = 'test-token';

describe('test suite for InterceptorService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get interceptors with API call', async () => {
    const mockResult = ['interceptor1', 'interceptor2'];
    (fetchInstance.withAuthGet as jest.Mock).mockResolvedValueOnce(mockResult);

    const result = await InterceptorService.getInterceptors(mockToken);

    expect(fetchInstance.withAuthGet).toHaveBeenCalledWith(apiRoutes.pluginInterceptors, mockToken);
    expect(result).toEqual(mockResult);
  });
});
