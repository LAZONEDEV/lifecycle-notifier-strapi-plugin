import React, { TextareaHTMLAttributes } from "react";
import { Textarea } from "@strapi/design-system";
import { useField } from "formik";
import { FormFieldProps } from "../../types";

export type InputFieldProps = FormFieldProps &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextareaField = ({ name, label, hint, ...props }: InputFieldProps) => {
  const [field, { error }] = useField(name);

  return (
    <Textarea error={error} label={label} hint={hint} {...props} {...field} />
  );
};

export default TextareaField;
