import { Select, Option } from "@strapi/design-system";
import { useField } from "formik";
import { CollectionSchema, FormFieldProps } from "../../types";
import { useEffect, useMemo, useState } from "react";
import { useCollectionFieldType } from "../../hooks/collection";
import { RecipientOptionType } from "../../../common/types/index";
import { RecipientType } from "../../../common/enums/index";
import { getCollectionNameFormUid } from "../../../common/utils/getCollectionNameFormUid";
import React from "react";
import { ConfigService } from "../../services/Config";
import {
  getRecipientStringValue,
  getRecipientTypeFromString,
} from "../../utils/recipientStringValue";

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
  const [envRecipients, setEnvRecipients] = useState<RecipientOptionType[]>([]);
  const [{ value: selectedCollectionName }] = useField(collectionFormName);
  const [{ value }, { error }, { setValue }] =
    useField<RecipientOptionType[]>(name);

  const loadEnvRecipients = async () => {
    const envsNames = await ConfigService.getEnvRecipients();
    if(!envsNames){
      return;
    }

    const recipientOptions = envsNames.map<RecipientOptionType>((env) => ({
      type: RecipientType.ENV,
      value: env,
    }));
    setEnvRecipients(recipientOptions);
  };

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

  useEffect(() => {
    loadEnvRecipients();
  }, []);

  const modelEmailFields = useCollectionFieldType({
    collectionId: selectedCollectionName,
    collections,
    fieldType: "email",
  });

  // we create string value because strapi select component does not
  // support object as value.
  const stringValue = useMemo(() => {
    return (value || []).map((item) => getRecipientStringValue(item));
  }, [value]);

  const modelRecipientOption = useMemo(() => {
    return modelEmailFields.map<RecipientOptionType>((item) => ({
      type: RecipientType.FORM_MODEL,
      value: item,
    }));
  }, [modelEmailFields]);

  const collectionName =
    selectedCollectionName && getCollectionNameFormUid(selectedCollectionName);

  // transform string values to recipient value
  const updateValue = (values: string[]) => {
    setValue(values.map((item) => getRecipientTypeFromString(item)));
  };

  return (
    <Select
      label={label}
      multi
      placeholder={placeholder}
      hint={hint}
      onClear={() => {
        setValue([]);
      }}
      value={stringValue}
      onChange={updateValue}
      error={error}
      withTags
    >
      {[...envRecipients, ...modelRecipientOption, ...customRecipients].map(
        (field) => {
          const value = getRecipientStringValue(field);
          return (
            <Option key={value} value={value}>
              {(() => {
                if (field.type === RecipientType.CUSTOM) {
                  return field.value;
                } else if (field.type === RecipientType.ENV) {
                  return `ENV.${field.value}`;
                }
                return `${collectionName}.${field.value}`;
              })()}
            </Option>
          );
        }
      )}
    </Select>
  );
};
