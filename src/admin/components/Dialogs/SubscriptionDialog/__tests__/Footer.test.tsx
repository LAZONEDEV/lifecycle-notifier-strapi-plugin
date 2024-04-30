import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Footer from "../Footer";
import StrapiThemeProvider from "../../../../testUtils/StrapiThemeProvider";

describe("test suite for SubscriptionDialogFooter component", () => {
  it("should call onClose when the cancel button is clicked", () => {
    const onCloseMock = jest.fn();

    const { getByTestId } = render(
      <Footer
        isSubmitting={false}
        onClose={onCloseMock}
        submitForm={jest.fn()}
      />,
      { wrapper: StrapiThemeProvider }
    );

    fireEvent.click(getByTestId("cancel-button"));

    expect(onCloseMock).toHaveBeenCalled();
  });

  it("should call submitForm when the submit button is clicked", () => {
    const submitFormMock = jest.fn();
    const { getByTestId } = render(
      <Footer
        isSubmitting={false}
        onClose={jest.fn()}
        submitForm={submitFormMock}
      />,
      { wrapper: StrapiThemeProvider }
    );

    fireEvent.click(getByTestId("submit-button"));

    expect(submitFormMock).toHaveBeenCalled();
  });
});
