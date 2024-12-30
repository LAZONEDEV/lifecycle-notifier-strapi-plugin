import { SingleSelect, SingleSelectOption } from '@strapi/design-system';
import { useField } from 'formik';
import { FormFieldProps } from '../../types';

type WithValue = { value: string };

export type SelectFieldProps<P extends WithValue & unknown> = FormFieldProps & {
  options: P[];
  getName: (item: P) => string;
  multi?: boolean;
};

function SelectField<P extends WithValue>({
  name,
  label,
  hint,
  options,
  placeholder,
  getName,
  multi,
  required,
}: SelectFieldProps<P>) {
  const [{ value }, { error }, { setValue }] = useField<P>(name);

  return (
    <SingleSelect
      aria-label={label}
      label={label}
      value={value}
      onChange={setValue}
      error={error}
      placeholder={placeholder}
      hint={hint}
      multi={multi}
      required={required}
    >
      {options.map((item) => {
        const name = getName(item);
        return (
          <SingleSelectOption key={`${item.value}-${name}`} value={item.value}>
            {name}
          </SingleSelectOption>
        );
      })}
    </SingleSelect>
  );
}

export default SelectField;
