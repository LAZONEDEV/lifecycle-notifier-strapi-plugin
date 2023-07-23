import React from "react";
import { useField } from "formik";
import { Select, Option } from "@strapi/design-system";
import { FormFieldProps } from "../../types";

type WithValue = { value: string };

export type SelectFieldProps<P extends WithValue & unknown> = FormFieldProps & {
  options: P[];
  getName: (item: P) => string;
};

function SelectField<P extends WithValue>({
  name,
  label,
  hint,
  options,
  placeholder,
  getName,
}: SelectFieldProps<P>) {
  const [{ value }, { error }, { setValue }] = useField<P>(name);

  return (
    <Select
      label={label}
      value={value}
      onChange={setValue}
      error={error}
      placeholder={placeholder}
      hint={hint}
    >
      {options.map((item) => {
        const name = getName(item);
        return (
          <Option key={`${item.value}-${name}`} value={item.value}>
            {name}
          </Option>
        );
      })}
    </Select>
  );
}

export default SelectField;
