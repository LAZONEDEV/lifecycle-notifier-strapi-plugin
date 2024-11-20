import { useStrapiToken } from './useStrapitoken';

export const strapiGetTokenInterceptor = (options: RequestInit) => {
  const token = useStrapiToken();
  console.log('token', token);

  if (!options.headers) {
    options.headers = {} as Record<string, string>;
  }

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  return options;
};
