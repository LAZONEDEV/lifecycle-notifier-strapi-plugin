import { array, object, string } from 'yup';
import { EventType } from '../common/enums';

export const subscriptionFormValidationSchema = object({
  subject: string().required('The subject is required'),
  content: string().required('Please enter content for mails'),
  eventType: string().oneOf(Object.values(EventType)).required('You must select an event type'),
  recipients: array().min(1, 'Please select at least one recipient'),
  collectionName: string().required('Please select the collection'),
  relations: array().nullable(),
  interceptors: array().nullable(),
});
