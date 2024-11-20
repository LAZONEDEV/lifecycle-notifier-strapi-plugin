import { subscriptionCollectionName } from '../common/constants/index';

export default {
  kind: 'collectionType',
  collectionName: 'lifecycle-subscription',
  info: {
    singularName: subscriptionCollectionName,
    pluralName: `${subscriptionCollectionName}s`,
    displayName: 'Lifecycle subscriptions',
  },
  pluginOptions: {
    'content-type-builder': {
      visible: false,
    },
  },
  options: {
    draftAndPublish: false,
  },
  attributes: {
    subject: {
      type: 'string',
    },
    collectionName: {
      type: 'string',
    },
    eventType: {
      type: 'string',
    },
    recipients: {
      type: 'json',
    },
    content: {
      type: 'text',
    },
    mediaFields: {
      type: 'json',
    },
    relations: {
      type: 'json',
    },
    interceptors: {
      type: 'json',
    },
  },
};
