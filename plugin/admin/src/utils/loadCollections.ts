import { CollectionSchema, CollectionSchemaResult } from "../types";
import axios from "./axios"

export const loadCollectionsSchemas = () => {
  const controller = new AbortController();

  const result = axios.get<CollectionSchemaResult>("/content-manager/content-types", { signal: controller.signal });

  return [result, () => controller.abort()] as const
}

export const filterApiCollection = (list: CollectionSchema[]) => {
  return list.filter(item => item.uid.startsWith("api::"))
}
