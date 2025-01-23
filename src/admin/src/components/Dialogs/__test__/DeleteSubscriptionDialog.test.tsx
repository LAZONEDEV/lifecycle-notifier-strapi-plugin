import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DeleteSubscriptionDialog from '../DeleteSubscriptionDialog';
import StrapiThemeProvider from '../../../testUtils/StrapiThemeProvider';

describe('test suite for DeleteSubscriptionDialog component', () => {
  it('should render the dialog', () => {
    const { getByTestId } = render(
      <DeleteSubscriptionDialog isVisible={true} onConfirm={jest.fn()} onCancel={jest.fn()} />,
      { wrapper: StrapiThemeProvider }
    );
    expect(getByTestId('dialog')).toBeVisible();
  });

  it('should call onCancel when the cancel button is clicked', () => {
    const onCancelMock = jest.fn();
    const { getByTestId } = render(
      <DeleteSubscriptionDialog isVisible={true} onConfirm={jest.fn()} onCancel={onCancelMock} />,
      { wrapper: StrapiThemeProvider }
    );

    fireEvent.click(getByTestId('cancel-button'));

    expect(onCancelMock).toHaveBeenCalled();
  });

  it('should call onConfirm when the confirm button is clicked', () => {
    const onConfirmMock = jest.fn();
    const { getByTestId } = render(
      <DeleteSubscriptionDialog isVisible={true} onConfirm={onConfirmMock} onCancel={jest.fn()} />,
      { wrapper: StrapiThemeProvider }
    );

    fireEvent.click(getByTestId('confirm-button'));

    expect(onConfirmMock).toHaveBeenCalled();
  });
});
