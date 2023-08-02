import fetchInstance from "../utils/fetchInstance";

export class ConfigService {
  static baseUrl = "/lifecycle-notifier/";
  static async getEnvRecipients() {
    const result = await fetchInstance.get<string[]>(
      `${ConfigService.baseUrl}env-recipients`
    );
    return result;
  }
}
