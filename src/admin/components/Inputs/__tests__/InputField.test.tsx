import { render as renderRTL } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import StrapiThemeProvider from "../../../testUtils/StrapiThemeProvider";
import FieldFormikWrapper from "../../../testUtils/FieldFormikWrapper";
import InputField from "../InputField";

const onSubmit = jest.fn();
const formInitialValues = { testField: "defaultFieldValue" };

const Component = () => (
  <FieldFormikWrapper initialValues={formInitialValues} onSubmit={onSubmit}>
    <InputField label="testField" name="testField" />
  </FieldFormikWrapper>
);

const render = () => renderRTL(<Component />, { wrapper: StrapiThemeProvider });

describe("test suite for InputField component", () => {
  it("should call update formik context", async () => {
    const textValue = "Text";
    const { getByTestId, getByRole } = render();

    await userEvent.clear(getByRole("textbox"));
    await userEvent.type(getByRole("textbox"), textValue);
    await userEvent.click(getByTestId("submit-button"));

    expect(onSubmit).toHaveBeenCalledWith({
      testField: textValue,
    });
  });

  it("should read value from formik context", async () => {
    const { getByRole } = render();

    expect((getByRole("textbox") as HTMLInputElement).value).toBe(
      formInitialValues.testField
    );
  });
});
