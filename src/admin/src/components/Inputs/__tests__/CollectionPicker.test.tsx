import { render as renderRTL } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { CollectionPicker, CollectionPickerProps } from '../CollectionPicker';
import React from 'react';
import StrapiThemeProvider from '../../../testUtils/StrapiThemeProvider';
import FieldFormikWrapper from '../../../testUtils/FieldFormikWrapper';
import { CollectionSchema } from '../../../types';

const onSubmit = jest.fn();
const collections = [
  {
    uid: '1',
    info: {
      displayName: 'Collection 1',
    },
  },
  {
    uid: '2',
    info: {
      displayName: 'Collection 2',
    },
  },
] as CollectionSchema[];

const Component = (props: Partial<Omit<CollectionPickerProps, 'aria-label'>>) => (
  <FieldFormikWrapper initialValues={{}} onSubmit={onSubmit}>
    <CollectionPicker collections={collections} name="testField" {...props} />
  </FieldFormikWrapper>
);

const render = (props: Partial<CollectionPickerProps> = {}) =>
  renderRTL(<Component {...props} />, { wrapper: StrapiThemeProvider });

describe('test suite for CollectionPicker component', () => {
  it('should render the select and the options', async () => {
    const { getByRole } = render();

    expect(getByRole('combobox')).toBeInTheDocument();

    await userEvent.click(getByRole('combobox'));

    expect(getByRole('option', { name: 'Collection 1' })).toBeInTheDocument();
    expect(getByRole('option', { name: 'Collection 2' })).toBeInTheDocument();
  });

  it('should update formik context', async () => {
    const { getByRole, getByTestId } = render();
    await userEvent.click(getByRole('combobox'));
    await userEvent.click(getByRole('option', { name: 'Collection 1' }));

    await userEvent.click(getByTestId('submit-button'));
    expect(onSubmit).toHaveBeenCalledWith({
      testField: '1',
    });
  });
});
