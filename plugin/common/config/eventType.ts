import { EventType as Event} from "../enums/index";

export interface EventType {
  name: string;
  value: Event
}

export const eventTypes = Object.values(Event).map<EventType>(event => ({
  name: event,
  value: event
}))
