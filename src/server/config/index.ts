import { validateConfig } from "../utils/configValidator";

export default {
  default: {},
  validator(conf: any) {
    const validationResult = validateConfig(conf);
    if (validationResult.errors.length) {
      throw new Error(`${validationResult.errors.map((error) => error.stack).join(",")}`);
    }
  },
};
