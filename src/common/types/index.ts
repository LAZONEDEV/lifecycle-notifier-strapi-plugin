import { EventType, RecipientType } from "../enums/index";

export interface FieldMapping {
  field: string;
  targets: {
    value: string;
    email: string;
  }[];
  defaultEmail?: string;
}

export interface RecipientOptionType {
  type: RecipientType;
  value: string | FieldMapping;
}

export interface SubscriptionEntry {
  id: string;
  subject: string;
  collectionName: string;
  eventType: EventType;
  recipients: RecipientOptionType[];
  content: string;
  mediaFields: string[];
  relations?: string[];
  interceptors?: string[];
}
