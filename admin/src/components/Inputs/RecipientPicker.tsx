import { SingleSelect, SingleSelectOption } from '@strapi/design-system';
import { useField } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { RecipientOptionType } from '../..//common/types/index';
import { RecipientType } from '../../common/enums/index';
import { getCollectionNameFormUid } from '../../common/utils/getCollectionNameFormUid';
import { useCollectionFieldType } from '../../hooks/collection';
import { useRecipients } from '../../hooks/recipients';
import { CollectionSchema, FormFieldProps } from '../../types';
import { createRecipientLabel } from '../../utils/createRecipientLabel';
import {
  getRecipientStringValue,
  getRecipientTypeFromString,
} from '../../utils/recipientStringValue';

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
  ...rest
}: RecipientPickerProps) => {
  const [customRecipients, setCustomRecipients] = useState<RecipientOptionType[]>([]);
  const envRecipients = useRecipients();
  const [{ value: selectedCollectionName }] = useField(collectionFormName);
  const [{ value }, { error }, { setValue }] = useField<RecipientOptionType[]>(name);

  useEffect(() => {
    if (value) {
      const includedCustomsValues = value.filter((item) => item.type === RecipientType.CUSTOM);
      setCustomRecipients((oldCustoms) => [...oldCustoms, ...includedCustomsValues]);
    }
  }, []);

  const modelEmailFields = useCollectionFieldType({
    collectionId: selectedCollectionName,
    collections,
    fieldType: 'email',
  });

  // we create string value because strapi select component does not
  // support object as value.
  const stringValue = useMemo(() => {
    return (value || []).map((item) => getRecipientStringValue(item));
  }, [value]);

  const modelRecipientOption = useMemo(() => {
    return modelEmailFields.map<RecipientOptionType>((item) => ({
      type: RecipientType.FROM_MODEL,
      value: item,
    }));
  }, [modelEmailFields]);

  const collectionName = selectedCollectionName && getCollectionNameFormUid(selectedCollectionName);

  // transform string values to recipient value
  const updateValue = (values: string[]) => {
    setValue(values.map((item) => getRecipientTypeFromString(item)));
  };

  return (
    <SingleSelect
      aria-label={label}
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
      {...rest}
    >
      {[...envRecipients, ...modelRecipientOption, ...customRecipients].map((field) => {
        const value = getRecipientStringValue(field);
        return (
          <SingleSelectOption key={value} value={value}>
            {createRecipientLabel(field, collectionName)}
          </SingleSelectOption>
        );
      })}
    </SingleSelect>
  );
};