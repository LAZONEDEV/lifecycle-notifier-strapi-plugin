import { auth } from '@strapi/helper-plugin';

export const strapiGetTokenInterceptor = (options: RequestInit) => {
  if(!options.headers){
    options.headers = {} as Record<string, string>;
  }

  options.headers = { 
    ...options.headers,
    "Authorization": `Bearer ${auth.getToken()}`
  }

  return options;
}
