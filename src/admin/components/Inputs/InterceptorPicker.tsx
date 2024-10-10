import React from "react";
import { useInterceptorsOptions } from "../../hooks/interceptors";
import { FormFieldProps } from "../../types";
import SelectField from "./SelectField";

export interface InterceptorPickerProps extends FormFieldProps {}

export const InterceptorPicker = ({ name }: InterceptorPickerProps) => {
  const options = useInterceptorsOptions();

  return (
    <SelectField
      getName={(item) => item.name}
      name={name}
      label="Interceptor to apply"
      placeholder="Select an interceptor"
      options={options}
      multi
    />
  );
};
