import SelectField from '../../components/Inputs/SelectField';
import { useInterceptorsOptions } from '../../hooks/interceptors';
import { FormFieldProps } from '../../types';

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
