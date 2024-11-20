import { useAuth } from '@strapi/strapi/admin';

export const useStrapiToken = () => {
  const getToken = useAuth('lifecycle-notifier-strapi-plugin', (state) => state.token!);
  return getToken;
};

export default useStrapiToken;
