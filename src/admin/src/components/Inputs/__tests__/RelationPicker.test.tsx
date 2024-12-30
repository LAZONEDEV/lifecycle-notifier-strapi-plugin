import { render as renderRTL } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';
import StrapiThemeProvider from '../../../testUtils/StrapiThemeProvider';
import FieldFormikWrapper from '../../../testUtils/FieldFormikWrapper';
import { RelationPicker, RelationPickerProps } from '../RelationPicker';

const optionFields = ['Option 1', 'Option 2', 'Option 3'];
jest.mock('../../../hooks/collection.ts', () => ({
  useCollectionFieldType: jest.fn(() => optionFields),
}));
const onSubmit = jest.fn();

const Component = (props: Partial<Omit<RelationPickerProps, 'aria-label'>>) => (
  <FieldFormikWrapper initialValues={{}} onSubmit={onSubmit}>
    <RelationPicker
      collections={[]}
      collectionFieldName="collectionName"
      name="testField"
      {...props}
    />
  </FieldFormikWrapper>
);

const render = (props: Partial<RelationPickerProps> = {}) =>
  renderRTL(<Component {...props} />, { wrapper: StrapiThemeProvider });

describe('test suite for RelationPicker component', () => {
  it('should render the select and the options', async () => {
    const { getByRole } = render();

    expect(getByRole('combobox')).toBeInTheDocument();

    await userEvent.click(getByRole('combobox'));

    optionFields.forEach((option) => {
      expect(getByRole('option', { name: option })).toBeInTheDocument();
    });
  });

  it('should update formik context', async () => {
    const { getByRole, getByTestId } = render();
    await userEvent.click(getByRole('combobox'));
    await userEvent.click(getByRole('option', { name: 'Option 1' }));

    await userEvent.click(getByTestId('submit-button'));
    expect(onSubmit).toHaveBeenCalledWith({
      testField: [optionFields[0]],
    });
  });

  it('should clear the context value when the X button is clicked', async () => {
    const { getByRole, getByTestId } = render();
    await userEvent.click(getByRole('combobox'));
    await userEvent.click(getByRole('option', { name: optionFields[0] }));

    await userEvent.keyboard('[Escape]');

    expect(getByRole('combobox')).toHaveTextContent(optionFields[0]);
    await userEvent.click(getByRole('button', { name: 'Clear' }));

    await userEvent.click(getByTestId('submit-button'));

    expect(onSubmit).toHaveBeenCalledWith({
      testField: [],
    });
  });
});
