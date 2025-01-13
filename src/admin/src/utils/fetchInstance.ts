import { strapiGetTokenInterceptor } from './strapiGetTokenInterceptor';
import HTTPClient from './httpClient';

const fetchInstance = new HTTPClient(process.env.STRAPI_ADMIN_BACKEND_URL!);

fetchInstance.addRequestInterceptor(strapiGetTokenInterceptor);

export default fetchInstance;
