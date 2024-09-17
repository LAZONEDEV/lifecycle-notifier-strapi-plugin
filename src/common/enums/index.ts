export enum RecipientType {
  // recipient email address that set as
  // environment value
  ENV = "ENV",
  // to use field on the related collection
  FROM_MODEL = "FROM_MODEL",
  // to use field on the related collection
  FROM_THE_ENTRY_RELATION = "FROM_THE_ENTRY_RELATION",
  // for custom value
  CUSTOM = "CUSTOM",
}

export enum EventType {
  AfterCreate = "afterCreate",
  AfterUpdate = "afterUpdate",
  AfterDelete = "afterDelete",
}
