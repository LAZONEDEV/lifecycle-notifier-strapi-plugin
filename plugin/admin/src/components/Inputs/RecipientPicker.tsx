import { Select, Option } from "@strapi/design-system";
import { useField } from "formik";
import { CollectionSchema, FormFieldProps } from "../../types";
import { useEffect, useMemo, useState } from "react";
import { useCollectionFieldType } from "../../hooks/collection";
import { RecipientOptionType } from "../../../../common/types/index";
import { RecipientType } from "../../../../common/enums/index";
import { getCollectionNameFormUid } from "../../../../common/utils/getCollectionNameFormUid";
import React from "react";

export interface RecipientPickerProps extends FormFieldProps {
  collectionFormName: string;
  collections: CollectionSchema[];
}

export const RecipientPicker = ({
  collectionFormName,
  collections,
  name,
  label,
  hint,
  placeholder,
}: RecipientPickerProps) => {
  const [customRecipients, setCustomRecipients] = useState<
    RecipientOptionType[]
  >([]);
  const [{ value: selectedCollectionName }] = useField(collectionFormName);
  const [{ value }, { error }, { setValue }] =
    useField<RecipientOptionType[]>(name);

  useEffect(() => {
    if (value) {
      const includedCustomsValues = value.filter(
        (item) => item.type === RecipientType.CUSTOM
      );
      setCustomRecipients((oldCustoms) => [
        ...oldCustoms,
        ...includedCustomsValues,
      ]);
    }
  }, []);

  const modelEmailFields = useCollectionFieldType({
    collectionId: selectedCollectionName,
    collections,
    fieldType: "email",
  });

  const modelRecipientOption = useMemo(() => {
    return modelEmailFields.map<RecipientOptionType>((item) => ({
      type: RecipientType.FORM_MODEL,
      value: item,
    }));
  }, [modelEmailFields]);

  const collectionName =
    selectedCollectionName && getCollectionNameFormUid(selectedCollectionName);

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
    >
      {[...modelRecipientOption, ...customRecipients].map((field) => (
        <Option value={field}>
          {(()=>{
            if(field.type === RecipientType.CUSTOM){
              return field.value
            } else if(field.type === RecipientType.ENV){
              return `ENV.${field.value}`
            }
            return `${collectionName}.${field.value}`
          })()}
        </Option>
      ))}
    </Select>
  );
};
