import { render as renderRTL } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { AttachableFilePicker, AttachableFilePickerProps } from '../AttachableFilePicker';
import React from 'react';
import StrapiThemeProvider from '../../../testUtils/StrapiThemeProvider';
import FieldFormikWrapper from '../../../testUtils/FieldFormikWrapper';

const fields = ['Option 1', 'Option 2', 'Option 3'];
jest.mock('../../../hooks/collection.ts', () => ({
  useCollectionFieldType: jest.fn(() => fields),
}));
const onSubmit = jest.fn();
const formikContextInitialValue = { collectionName: 'testCollection' };

const Component = (props: Partial<AttachableFilePickerProps>) => (
  <FieldFormikWrapper initialValues={formikContextInitialValue} onSubmit={onSubmit}>
    <AttachableFilePicker
      collections={[]}
      collectionFormName="collectionName"
      name="testField"
      {...props}
    />
  </FieldFormikWrapper>
);

const render = (props: Partial<AttachableFilePickerProps> = {}) =>
  renderRTL(<Component {...props} />, { wrapper: StrapiThemeProvider });

describe('test suite for AttachableFilePicker component', () => {
  it('should render the select and the options', async () => {
    const { getByRole } = render();

    expect(getByRole('combobox')).toBeInTheDocument();

    await userEvent.click(getByRole('combobox'));

    fields.forEach((option) => {
      expect(getByRole('option', { name: option })).toBeInTheDocument();
    });
  });

  it('should update formik context', async () => {
    const { getByRole, getByTestId } = render();
    await userEvent.click(getByRole('combobox'));
    await userEvent.click(getByRole('option', { name: 'Option 1' }));

    await userEvent.click(getByTestId('submit-button'));
    expect(onSubmit).toHaveBeenCalledWith({
      testField: ['Option 1'],
      ...formikContextInitialValue,
    });
  });

  it('should clear the context value when the X button is clicked', async () => {
    const { getByRole, getByTestId } = render();
    await userEvent.click(getByRole('combobox'));
    await userEvent.click(getByRole('option', { name: fields[0] }));

    await userEvent.keyboard('[Escape]');

    expect(getByRole('combobox')).toHaveTextContent(fields[0]);
    await userEvent.click(getByRole('button', { name: 'Clear' }));

    await userEvent.click(getByTestId('submit-button'));

    expect(onSubmit).toHaveBeenCalledWith({
      ...formikContextInitialValue,
      testField: [],
    });
  });
});
