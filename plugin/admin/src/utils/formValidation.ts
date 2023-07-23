import * as yup from "yup";
import { EventType } from "../../../common/enums";

export const subscriptionFormValidationSchema = yup.object({
  subject: yup.string().required("The subject is required"),
  content: yup.string().required("Please enter content for mails"),
  eventType: yup
    .string()
    .oneOf(Object.values(EventType))
    .required("You must select an event type"),
  recipients: yup.array().min(1, "Please select at least one recipient"),
  collectionName: yup.string().required("Please select the collection")
});
