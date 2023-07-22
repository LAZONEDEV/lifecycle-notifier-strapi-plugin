import { RecipientOptionType,SubscriptionEntry } from "../../common/types/index";

export interface PluginConfigs {
  recipients: RecipientOptionType,
  subscriptions: SubscriptionEntry
}

export interface StrapiStore {
  get(key: string): any,
  set(key: string, value: any): void
}

export enum PluginStoreKeys {
  SETTINGS = "SETTINGS",
  POPULATED = "POPULATED"
}
