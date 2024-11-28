import { renderHook, act } from '@testing-library/react';
import { useRecipients } from '../recipients';
import { ConfigService } from '../../services/Config';
import { RecipientType } from '../../../common/enums';

jest.mock('../../services/Config', () => ({
  ConfigService: {
    getEnvRecipients: jest.fn(),
  },
}));

const mockEnvRecipients = ['env1', 'env2'];

describe('test suite for useRecipients hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch envRecipients', async () => {
    (ConfigService.getEnvRecipients as jest.Mock).mockResolvedValue(mockEnvRecipients);
    const expectedResult = mockEnvRecipients.map((env) => ({
      type: RecipientType.ENV,
      value: env,
    }));
    const { rerender, result } = renderHook(() => useRecipients());

    await act(async () => {
      rerender();
    });

    expect(result!.current).toEqual(expectedResult);
  });
});
