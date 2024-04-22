import { CollectionEntry } from "./index";

declare module "@strapi/database/lib/lifecycles" {
  export interface Event {
    result?: CollectionEntry & Record<string, unknown>;
  }
}
