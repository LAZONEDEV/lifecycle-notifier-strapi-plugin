export interface FormFieldProps {
  label?: string;
  hint?: string;
  placeholder?: string;
  name: string;
  required?: boolean;
}

export interface CollectionAttribute extends Record<string, AttrConfig> {}

export interface CollectionSchema {
  uid: string;
  isDisplayed: boolean;
  apiID: string;
  kind: string;
  info: Info;
  attributes: CollectionAttribute;
}

export interface Info {
  name: string;
  description: string;
  singularName: string;
  pluralName: string;
  displayName: string;
}

export interface AttrConfig {
  type: string;
}

export interface CollectionSchemaResult {
  data: CollectionSchema[]
}

export interface Interceptor {
  (options: RequestInit): RequestInit;
}

export type InterceptorOptionType = {
  name: string;
  value: string;
};
