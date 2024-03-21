import pluginId from "../../../common/utils/pluginId";
import { ConfigServiceApi } from "../../services/config";
import Config from "../configs";
import { describe, it, expect, jest, beforeEach } from "@jest/globals";

describe("Configurations Tests", () => {
  let strapi;
  let ctx;

  beforeEach(() => {
    // Mock the strapi object
    strapi = {
      plugin: jest.fn().mockReturnValue({
        service: jest.fn().mockReturnValue({
          getRecipientConfig: jest
            .fn()
            .mockReturnValue({ recipients: ["test@example.com"] }),
        }),
      }),
    };

    // Mock the context object
    ctx = {
      body: null,
    };
  });

  it("should set the recipient config in the context body", () => {
    const instance = Config({ strapi });
    instance.envRecipients(ctx);
    expect(ctx.body).toEqual({ recipients: ["test@example.com"] });
  });

  it("should return the plugin ID", () => {
    const instance = Config({ strapi });
    const result = instance.index();
    expect(result).toBe(pluginId);
  });
});

