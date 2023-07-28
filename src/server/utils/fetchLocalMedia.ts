import { readFileSync } from "node:fs";

export const fetchLocalMedia = (patch: string) => {
  return readFileSync(`${strapi.dirs.static.public}${patch}`);
};
