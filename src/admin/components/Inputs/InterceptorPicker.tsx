import React from "react";
import SelectField from "./SelectField";
import { FormFieldProps } from "../../types";
import { useInterceptorsOptions } from "../../hooks/interceptors";

export interface InterceptorPickerProps extends FormFieldProps {}

export const InterceptorPicker = ({ name }: InterceptorPickerProps) => {
  const options = useInterceptorsOptions();

  return (
    <SelectField
      getName={(item) => item.name}
      name={name}
      label="Interceptor to apply"
      placeholder="Select a interceptor"
      options={options}
      multi
    />
  );
};
