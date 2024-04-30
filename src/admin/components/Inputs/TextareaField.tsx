import React, { TextareaHTMLAttributes, ChangeEvent } from "react";
import { Textarea } from "@strapi/design-system";
import { useField } from "formik";
import { FormFieldProps } from "../../types";

export type InputFieldProps = FormFieldProps &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextareaField = ({ name, label, hint, ...props }: InputFieldProps) => {
  const [{ value }, { error }, { setValue }] = useField(name);

  return (
    <Textarea
      error={error}
      aria-label={label}
      label={label}
      hint={hint}
      {...props}
      value={value}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
      }}
      name={name}
    />
  );
};

export default TextareaField;
