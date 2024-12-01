import { apiRoutes } from '../../constants/apiRoutes';
import fetchInstance from '../../utils/fetchInstance';
import { ConfigService } from '../Config';

jest.mock('../../utils/fetchInstance', () => ({
  __esModule: true,
  default: {
    withAuthGet: jest.fn(),
  },
}));

const mockToken = 'test-token';

describe('test suite for ConfigService', () => {
  it('should get env recipients with API call', async () => {
    const mockResult = ['recipient1', 'recipient2'];
    (fetchInstance.withAuthGet as jest.Mock).mockResolvedValueOnce(mockResult);

    const result = await ConfigService.getEnvRecipients(mockToken);

    expect(fetchInstance.withAuthGet).toHaveBeenCalledWith(
      apiRoutes.pluginEnvRecipients,
      mockToken
    );
    expect(result).toEqual(mockResult);
  });
});
