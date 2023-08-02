import React, { useMemo } from "react";
import SelectField from "./SelectField";
import { CollectionSchema, FormFieldProps } from "../../types";

type CollectionOptionType = {
  name: string;
  value: string;
};

export interface CollectionPickerProps extends FormFieldProps {
  collections: CollectionSchema[];
}

export const CollectionPicker = ({ collections, name }: CollectionPickerProps) => {
  const options = useMemo(() => {
    return collections.map<CollectionOptionType>((collection) => ({
      name: collection.info.displayName,
      value: collection.uid,
    }));
  }, [collections]);

  return (
    <SelectField<CollectionOptionType>
      getName={(item) => item.name}
      name={name}
      label="Related collection"
      placeholder="Select a collection"
      options={options}
    />
  );
};
