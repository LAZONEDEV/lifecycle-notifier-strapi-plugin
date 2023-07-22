import { validate } from "../utils/configValidator";

export default {
  default: {
  },
  validator(conf:any) {return validate(conf)},
};
