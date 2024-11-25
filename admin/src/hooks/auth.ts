import { useAuth } from '@strapi/strapi/admin';

const useUserAuth = () => {
  const token = useAuth('lifecycle-notifier-strapi-plugin', (state) => state.token!);

  return token;
};

export default useUserAuth;
