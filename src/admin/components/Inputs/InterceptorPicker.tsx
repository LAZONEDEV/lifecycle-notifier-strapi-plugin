import React, { useEffect, useState } from "react";
import SelectField from "./SelectField";
import { InterceptorService } from "../../services/Interceptor";
import { FormFieldProps } from "../../types";

type OptionType = {
  name: string;
  value: string;
};

export interface InterceptorPickerProps extends FormFieldProps {}

export const InterceptorPicker = ({ name }: InterceptorPickerProps) => {
  const [options, setOptions] = useState<OptionType[]>([]);

  const loadInterceptors = () => {
    let ignore = false;

    const fetchInterceptors = async () => {
      try {
        const existingInterceptors = await InterceptorService.getInterceptors();
        if (!ignore) {
          const interceptorsOptions = existingInterceptors.map((item) => ({
            name: item,
            value: item,
          }));
          setOptions(interceptorsOptions);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchInterceptors();

    return () => {
      ignore = true;
    };
  };

  useEffect(loadInterceptors, []);

  return (
    <SelectField<OptionType>
      getName={(item) => item.name}
      name={name}
      label="Interceptor to apply"
      placeholder="Select a interceptor"
      options={options}
      multi
    />
  );
};
