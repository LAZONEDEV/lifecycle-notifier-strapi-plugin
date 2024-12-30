import { SingleSelect, SingleSelectOption } from '@strapi/design-system';
import { useField } from 'formik';
import { useCollectionFieldType } from '../../hooks/collection';
import { CollectionSchema, FormFieldProps } from '../../types';

export interface AttachableFilePickerProps extends FormFieldProps {
  collectionFormName: string;
  collections: CollectionSchema[];
}

export const AttachableFilePicker = ({
  name,
  hint,
  label,
  placeholder,
  collectionFormName,
  collections,
  ...rest
}: AttachableFilePickerProps) => {
  const [{ value: selectedCollectionName }] = useField(collectionFormName);
  const [{ value }, { error }, { setValue }] = useField<string[]>(name);

  const mediaFields = useCollectionFieldType({
    collectionId: selectedCollectionName,
    collections,
    fieldType: 'media',
  });
  const hasMediaField = !!mediaFields.length;

  return (
    <SingleSelect
      aria-label={label}
      label={label}
      multi
      placeholder={placeholder}
      hint={hasMediaField ? hint : 'No media field to select on the selected collection'}
      onClear={() => {
        setValue([]);
      }}
      value={value || []}
      onChange={setValue}
      error={error}
      withTags
      disabled={!hasMediaField}
      {...rest}
    >
      {mediaFields.map((field) => (
        <SingleSelectOption key={field} value={field}>
          {field}
        </SingleSelectOption>
      ))}
    </SingleSelect>
  );
};
