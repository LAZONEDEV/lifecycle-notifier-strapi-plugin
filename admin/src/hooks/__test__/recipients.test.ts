import { act, renderHook } from '@testing-library/react';
import { RecipientType } from '../../common/enums';
import { ConfigService } from '../../services/Config';
import { useRecipients } from '../recipients';

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
