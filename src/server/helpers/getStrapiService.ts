export const getEmailService = () => {
  return strapi.plugin("email").service("email");
};

export const getFileService = () => {
  return strapi.plugin("upload").service("file")
}
