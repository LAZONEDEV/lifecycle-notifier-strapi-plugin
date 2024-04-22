import { Option, Select } from "@strapi/design-system";
import { CollectionSchema, FormFieldProps } from "../../types";
import React from "react";
import { useField } from "formik";
import { useCollectionFieldType } from "../../hooks/collection";

export interface RelationPickerProps extends FormFieldProps {
  collectionFieldName: string;
  collections: CollectionSchema[];
}

export const RelationPicker = ({
  name,
  hint,
  label,
  placeholder,
  collectionFieldName,
  collections,
}: RelationPickerProps) => {
  const [{ value: selectedCollectionName }] = useField(collectionFieldName);
  const [{ value }, { error }, { setValue }] = useField<string[]>(name);

  const relationFields = useCollectionFieldType({
    collectionId: selectedCollectionName,
    collections,
    fieldType: "relation",
  });

  const hasRelationField = !!relationFields.length;

  return (
    <Select
      label={label}
      multi
      placeholder={placeholder}
      hint={hint}
      onClear={() => {
        setValue([]);
      }}
      value={value || []}
      onChange={setValue}
      error={error}
      withTags
      disabled={!hasRelationField}
    >
      {relationFields.map((field) => (
        <Option key={field} value={field}>
          {field}
        </Option>
      ))}
    </Select>
  );
};
