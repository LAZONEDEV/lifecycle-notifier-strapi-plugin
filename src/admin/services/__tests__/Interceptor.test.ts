import { InterceptorService } from "../Interceptor";
import fetchInstance from "../../utils/fetchInstance";
import { apiRoutes } from "../../constants/apiRoutes";

jest.mock("../../utils/fetchInstance", () => ({
  get: jest.fn(),
}));

describe("test suite for InterceptorService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get interceptors with API call", async () => {
    const mockResult = ["interceptor1", "interceptor2"];
    (fetchInstance.get as jest.Mock).mockResolvedValueOnce(mockResult);

    const result = await InterceptorService.getInterceptors();

    expect(fetchInstance.get).toHaveBeenCalledWith(
      apiRoutes.pluginInterceptors
    );
    expect(result).toEqual(mockResult);
  });
});
