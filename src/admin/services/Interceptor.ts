import fetchInstance from "../utils/fetchInstance";

export class InterceptorService {
  static baseUrl = "/lifecycle-notifier/";
  static async getInterceptors() {
    const result = await fetchInstance.get(
      `${InterceptorService.baseUrl}interceptors`
    );

    return result as string[];
  }
}
