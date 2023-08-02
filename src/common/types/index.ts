import { EventType, RecipientType } from "../enums/index";

export interface RecipientOptionType {
  type: RecipientType,
  value: string
}

export interface SubscriptionEntry {
  id: string;
  subject: string;
  collectionName: string;
  eventType: EventType;
  recipients: RecipientOptionType[];
  content: string;
  mediaFields: string[]
  relations?: string[]
}
