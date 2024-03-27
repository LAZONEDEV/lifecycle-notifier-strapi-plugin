import { loadSubsFromPluginConfig } from "../loadSubsFromPluginConfig";
import { getPluginConfig } from "../getPluginConfig";
import { getFromStore, saveInStore } from "../pluginStore";
import { validate } from "jsonschema";
import { insertSubscription } from "../insertSubscription";
import { ConfigKeys, PluginStoreKeys } from "../../types";
import { subscriptionsSchema } from "../../utils/configValidator";
import { describe, expect, it, jest, beforeEach } from "@jest/globals";

jest.mock("../getPluginConfig");
jest.mock("../pluginStore");
jest.mock("jsonschema");
jest.mock("../insertSubscription");

describe("Unit Test for loadSubsFromPluginConfig Funtion", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return early if no subscriptions are found", async () => {
    const mockedGetPluginConfig = getPluginConfig as jest.MockedFunction<
      typeof getPluginConfig
    >;
    mockedGetPluginConfig.mockReturnValue(undefined);
    await loadSubsFromPluginConfig();
    expect(getFromStore).not.toHaveBeenCalled();
  });

  it("should successfully load subscriptions", async () => {
    const mockSubs = [{ id: "1" }];
    const mockedGetPluginConfig = getPluginConfig as jest.MockedFunction<
      typeof getPluginConfig
    >;
    mockedGetPluginConfig.mockReturnValue(mockSubs);

    const mockedGetFromStore = getFromStore as jest.MockedFunction<
      typeof getFromStore
    >;
    mockedGetFromStore.mockResolvedValue(false);

    const mockedValidate = validate as jest.Mock;
    mockedValidate.mockReturnValue({ errors: [] });

    const mockedInsertSubscription = insertSubscription as jest.Mock;
    mockedInsertSubscription.mockResolvedValue(true as never);
    await loadSubsFromPluginConfig();
    expect(saveInStore).toHaveBeenCalledWith(PluginStoreKeys.POPULATED, true);
  });
});

