import { auth } from '@strapi/helper-plugin';
import HTTPClient from './httpClient';

const fetchInstance = new HTTPClient(process.env.STRAPI_ADMIN_BACKEND_URL!)

fetchInstance.addRequestInterceptor( options => {
  if(!options.headers){
    options.headers = {} as Record<string, string>;
  }

  options.headers = { 
    ...options.headers,
    "Authorization": `Bearer ${auth.getToken()}`
  }

  return options;
})

export default fetchInstance;
