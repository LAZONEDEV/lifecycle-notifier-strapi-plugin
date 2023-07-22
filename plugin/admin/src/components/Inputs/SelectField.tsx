import React from "react";
import { useField } from "formik";
import { CreatableCombobox, ComboboxOption } from "@strapi/design-system";
import { FormFieldProps } from "../../types";

type WithValue = { value: string };

export type SelectFieldProps<P extends WithValue & unknown> = FormFieldProps & {
  options: P[];
  onCreateOption?: (value: string) => P;
  getName: (item: P) => string;
};

function SelectField<P extends WithValue>({
  name,
  label,
  hint,
  options,
  placeholder,
  onCreateOption,
  getName,
}: SelectFieldProps<P>) {
  const [{ value }, { error }, { setValue }] = useField<P>(name);

  return (
    <CreatableCombobox
      label={label}
      value={value}
      onChange={setValue}
      error={error}
      placeholder={placeholder}
      onCreateOption={onCreateOption || (() =>{})}
      hint={hint}
    >
      {options.map((item) => {
        const name = getName(item);
        return (
          <ComboboxOption key={`${item.value}-${name}`} value={item.value}>
            {name}
          </ComboboxOption>
        );
      })}
    </CreatableCombobox>
  );
}

export default SelectField;
