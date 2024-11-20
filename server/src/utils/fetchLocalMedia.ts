import { readFileSync } from 'node:fs';
import { getStrapi } from '../helpers/getStrapi';

export const fetchLocalMedia = (patch: string) => {
  const strapi = getStrapi();

  return readFileSync(`${strapi.dirs.static.public}${patch}`);
};
