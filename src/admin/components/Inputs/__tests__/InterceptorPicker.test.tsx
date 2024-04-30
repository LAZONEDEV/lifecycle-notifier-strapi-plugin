import { render as renderRTL } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import StrapiThemeProvider from "../../../testUtils/StrapiThemeProvider";
import FieldFormikWrapper from "../../../testUtils/FieldFormikWrapper";
import { InterceptorPicker } from "../InterceptorPicker";

const interceptors = [
  {
    name: "Test 1",
    value: "Interceptor 1",
  },
  {
    name: "Test 2",
    value: "Interceptor 2",
  },
];
const defaultSelectedInterceptor = interceptors[0];
jest.mock("../../../hooks/interceptors.ts", () => ({
  useInterceptorsOptions: jest.fn(() => interceptors),
}));

const testFieldName = "testField";
const onSubmit = jest.fn();
const formikContextInitialValue = {
  [testFieldName]: defaultSelectedInterceptor.value,
};

const Component = () => (
  <FieldFormikWrapper
    initialValues={formikContextInitialValue}
    onSubmit={onSubmit}
  >
    <InterceptorPicker name={testFieldName} />
  </FieldFormikWrapper>
);

const render = () => renderRTL(<Component />, { wrapper: StrapiThemeProvider });

describe("test suite for InterceptorPicker component", () => {
  it("should render the select and the options", async () => {
    const { getByRole } = render();

    expect(getByRole("combobox")).toBeInTheDocument();

    await userEvent.click(getByRole("combobox"));

    interceptors.forEach((interceptor) => {
      expect(
        getByRole("option", { name: interceptor.name })
      ).toBeInTheDocument();
    });
  });

  it("should read the default selected from the formik context", async () => {
    const { getByRole } = render();

    expect(getByRole("combobox")).toHaveTextContent(
      defaultSelectedInterceptor.name
    );
  });

  it("should call update formik context", async () => {
    const { getByRole, getByTestId } = render();
    await userEvent.click(getByRole("combobox"));
    await userEvent.click(getByRole("option", { name: interceptors[1].name }));

    await userEvent.click(getByTestId("submit-button"));
    expect(onSubmit).toHaveBeenCalledWith({
      [testFieldName]: [interceptors[1].value],
    });
  });
});
