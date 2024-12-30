import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import Interceptor from '../interceptors';

describe('Interceptor Unit Test', () => {
  let strapi;
  let ctx;
  const interceptors = ['interceptor1', 'interceptor2'];

  beforeEach(() => {
    // Mock the strapi object
    strapi = {
      plugin: jest.fn().mockReturnValue({
        service: jest.fn().mockReturnValue({
          getInterceptors: jest.fn().mockReturnValue({
            interceptors: interceptors,
          }),
        }),
      }),
    };

    // Mock the context object
    ctx = {
      body: null,
    };
  });

  it('should define interceptors in the request response body', () => {
    const interceptorController = Interceptor({ strapi });
    interceptorController.getInterceptors(ctx);
    expect(ctx.body).toEqual({
      interceptors: interceptors,
    });
  });
});
