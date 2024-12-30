import { describe, jest, it, expect } from '@jest/globals';
import { getPluginConfigs } from '../../helpers/getPluginConfig';
import { ConfigKeys, Interceptor, PluginConfigs } from '../../types';
import interceptorsService from '../interceptor';

jest.mock('../../helpers/getPluginConfig', () => ({
  getPluginConfigs: jest.fn(),
}));

describe('Unit tests for interceptors service', () => {
  it('should return the interceptors names', () => {
    const testInterceptorName = 'test';
    const interceptions: Interceptor[] = [
      {
        name: testInterceptorName,
        callback: () => void 0,
      },
    ];
    const exceptedResponse = [testInterceptorName];

    const config: PluginConfigs = {
      [ConfigKeys.INTERCEPTORS]: interceptions,
    };

    (getPluginConfigs as jest.Mock).mockReturnValue(config);

    const response = interceptorsService().getInterceptors();
    expect(response).toEqual(exceptedResponse);
  });
});
