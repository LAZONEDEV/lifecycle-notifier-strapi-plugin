import pluginId from "../../../common/utils/pluginId";
import Config from "../configs";
import { describe, it, expect, jest, beforeEach } from "@jest/globals";

describe("Configurations Controller Tests", () => {
  let strapi;
  let ctx;
  const recipe = { recipients: ["test@example.com"] };

  beforeEach(() => {
    // Mock the strapi object
    strapi = {
      plugin: jest.fn().mockReturnValue({
        service: jest.fn().mockReturnValue({
          getRecipientConfig: jest.fn().mockReturnValue(recipe),
        }),
      }),
    };

    // Mock the context object
    ctx = {
      body: null,
    };
  });

  it("should set the recipient config in the context body", () => {
    const configController = Config({ strapi });
    configController.envRecipients(ctx);
    expect(ctx.body).toEqual(recipe);
  });

  it("should return the plugin ID", () => {
    const configController = Config({ strapi });
    const result = configController.index();
    expect(result).toBe(pluginId);
  });
});
