import { getStrapi } from "./getStrapi";

export const getEmailService = () => {
  const strapi = getStrapi();

  return strapi.plugin("email").service("email");
};

export const getFileService = () => {
  const strapi = getStrapi();

  return strapi.plugin("upload").service("file");
};
