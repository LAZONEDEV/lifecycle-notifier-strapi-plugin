import axios from "../utils/axios";

export class ConfigService {
  static baseUrl = "lifecycle-notifier/";
  static async getEnvRecipients() {
    const result = await axios.get<string[]>(
      `${ConfigService.baseUrl}env-recipients`
    );
    return result.data;
  }
}
