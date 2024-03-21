import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import pluginId from "../../../common/utils/pluginId";
import InterceptorsServiceApi from "../../services/interceptor";
import Interceptor from "../interceptors";

describe("Interceptor Unit Test", () => {
  let strapi;
  let ctx;

  beforeEach(() => {
    // Mock the strapi object
    strapi = {
      plugin: jest.fn().mockReturnValue({
        service: jest.fn().mockReturnValue({
          getInterceptors: jest
            .fn()
            .mockReturnValue({
              interceptors: ["interceptor1", "interceptor2"],
            }),
        }),
      }),
    };

    // Mock the context object
    ctx = {
      body: null,
    };
  });

  it("should set the interceptors in the context body", () => {
    const instance = Interceptor({ strapi });
    instance.getInterceptors(ctx);
    expect(ctx.body).toEqual({
      interceptors: ["interceptor1", "interceptor2"],
    });
  });
});

