import { handleEventSubscription } from './services/core/handleEventSubscription';

export default () => {
  strapi.documents.use(async (context, next) => {
    const result = await next();

    if (result && ['create'].includes(context.action)) {
      handleEventSubscription(context, result as Record<string, any>);
    }

    return result;
  });
};
