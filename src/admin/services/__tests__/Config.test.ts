import { ConfigService } from "../Config";
import fetchInstance from "../../utils/fetchInstance";
import { apiRoutes } from "../../constants/apiRoutes";

jest.mock("../../utils/fetchInstance", () => ({
  get: jest.fn(),
}));

describe("test suite for ConfigService", () => {
  it("should get env recipients with API call", async () => {
    const mockResult = ["recipient1", "recipient2"];
    (fetchInstance.get as jest.Mock).mockResolvedValueOnce(mockResult);

    const result = await ConfigService.getEnvRecipients();

    expect(fetchInstance.get).toHaveBeenCalledWith(
      apiRoutes.pluginEnvRecipients
    );
    expect(result).toEqual(mockResult);
  });
});
