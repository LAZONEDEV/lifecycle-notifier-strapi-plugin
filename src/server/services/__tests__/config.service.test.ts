import { describe, jest, it, expect } from "@jest/globals";
import { getPluginConfigs } from "../../helpers/getPluginConfig";
import { ConfigKeys, PluginConfigs } from "../../types";
import configService from "../config";

jest.mock("../../helpers/getPluginConfig", () => ({
  getPluginConfigs: jest.fn(),
}));

describe("Unit test for config service", () => {
  it("should return the config", () => {
    const envRecipients = ["TEST"];
    const configs: PluginConfigs = {
      [ConfigKeys.ENV_RECIPIENT]: envRecipients,
    };

    (getPluginConfigs as jest.Mock).mockReturnValue(configs);
    const returnedEnvRecipients = configService().getRecipientConfig();

    expect(returnedEnvRecipients).toEqual(envRecipients);
  });
});
