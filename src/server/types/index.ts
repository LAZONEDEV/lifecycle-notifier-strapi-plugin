/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubscriptionEntry } from "../../common/types/index";

export interface PluginConfigs {
  [ConfigKeys.ENV_RECIPIENT]?: string[];
  [ConfigKeys.SUBSCRIPTIONS]?: SubscriptionEntry[];
  [ConfigKeys.DEFAULT_MAIL_FROM]?: string;
  [ConfigKeys.INTERCEPTORS]?: Interceptor[];
}

export interface StrapiMedia {
  id: number;
  name: string;
  alternativeText: null | string;
  caption: null;
  width: number;
  height: number;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null | string;
  provider: string;
  folderPath: string;
  createdAt: Date;
  updatedAt: Date;
  isSelectable: boolean;
  type: string;
}

export interface Value {
  value: any;
}
export interface StrapiStore {
  get(): Promise<any>;
  set(value: Value): Promise<void>;
}

export enum PluginStoreKeys {
  SETTINGS = "SETTINGS",
  POPULATED = "POPULATED",
}

export enum ConfigKeys {
  ENV_RECIPIENT = "envRecipients",
  DEFAULT_MAIL_FROM = "defaultFrom",
  SUBSCRIPTIONS = "subscriptions",
  INTERCEPTORS = "interceptors",
}

export interface MailAttachment {
  filename: string;
  content: Buffer | Blob;
  contentType: string;
}

export interface MailOptions {
  to: string;
  from?: string;
  attachments?: MailAttachment[];
}

export interface CollectionEntry {
  id: string;
}

export interface Interceptor {
  name: string;
  callback: (
    entry: Record<string, any>
  ) => Promise<Record<string, any>> | undefined;
}

declare module "@strapi/database/lib/lifecycles" {
  export interface Event {
    result?: CollectionEntry & Record<string, unknown>;
  }
}
