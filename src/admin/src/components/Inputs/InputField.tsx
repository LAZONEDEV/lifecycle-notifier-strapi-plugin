import React, { InputHTMLAttributes } from 'react';
import { TextInput } from '@strapi/design-system';
import { useField } from 'formik';
import { FormFieldProps } from '../../types';

export type InputFieldProps = FormFieldProps & InputHTMLAttributes<HTMLInputElement>;

const InputField = ({ name, label, hint, ...props }: InputFieldProps) => {
  const [field, { error }] = useField(name);

  return (
    <TextInput aria-label={label} error={error} label={label} hint={hint} {...props} {...field} />
  );
};

export default InputField;
