import { SingleSelect, SingleSelectOption } from '@strapi/design-system';
import { useField } from 'formik';
import { useCollectionFieldType } from '../../hooks/collection';
import { CollectionSchema, FormFieldProps } from '../../types';

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
  ...rest
}: RelationPickerProps) => {
  const [{ value: selectedCollectionName }] = useField(collectionFieldName);
  const [{ value }, { error }, { setValue }] = useField<string[]>(name);

  const relationFields = useCollectionFieldType({
    collectionId: selectedCollectionName,
    collections,
    fieldType: 'relation',
  });

  const hasRelationField = !!relationFields.length;

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
      value={value || []}
      onChange={setValue}
      error={error}
      withTags
      disabled={!hasRelationField}
      {...rest}
    >
      {relationFields.map((field) => (
        <SingleSelectOption key={field} value={field}>
          {field}
        </SingleSelectOption>
      ))}
    </SingleSelect>
  );
};
