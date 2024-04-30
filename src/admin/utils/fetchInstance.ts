import HTTPClient from './httpClient';
import { strapiGetTokenInterceptor } from './strapiGetTokenInterceptor';

const fetchInstance = new HTTPClient(process.env.STRAPI_ADMIN_BACKEND_URL!)

fetchInstance.addRequestInterceptor( strapiGetTokenInterceptor)

export default fetchInstance;
