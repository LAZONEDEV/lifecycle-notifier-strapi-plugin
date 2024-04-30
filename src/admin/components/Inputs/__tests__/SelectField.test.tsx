import { render as renderRTL } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import SelectField, { SelectFieldProps } from "../SelectField";
import React from "react";
import StrapiThemeProvider from "../../../testUtils/StrapiThemeProvider";
import FieldFormikWrapper from "../../../testUtils/FieldFormikWrapper";

const onSubmit = jest.fn();
const options = [
  {
    name: "Test 1",
    value: "Test 1",
  },
  {
    name: "Test 2",
    value: "Test 2",
  },
];

const Component = (
  props: Partial<Omit<SelectFieldProps<(typeof options)[number]>, "aria-label">>
) => (
  <FieldFormikWrapper initialValues={{}} onSubmit={onSubmit}>
    <SelectField
      getName={({ name }) => name}
      options={options}
      name="testField"
      {...props}
    />
  </FieldFormikWrapper>
);

const render = (
  props: Partial<SelectFieldProps<(typeof options)[number]>> = {}
) => renderRTL(<Component {...props} />, { wrapper: StrapiThemeProvider });

describe("test suite for SelectField component", () => {
  it("should render the select and the options", async () => {
    const { getByRole } = render();

    expect(getByRole("combobox")).toBeInTheDocument();

    await userEvent.click(getByRole("combobox"));
    options.forEach(({ name }) => {
      expect(getByRole("option", { name })).toBeInTheDocument();
    });
  });

  it("should allow multiple selections", async () => {
    const { getByRole } = render({ multi: true });
    await userEvent.click(getByRole("combobox"));
    await userEvent.click(getByRole("option", { name: options[0].name }));
    await userEvent.click(getByRole("option", { name: options[1].name }));

    await userEvent.keyboard("[Escape]");

    expect(getByRole("combobox")).toHaveTextContent("Test 1Test 2");
  });

  it("should call update formik context", async () => {
    const optionsToSelect = options[0];

    const { getByRole, getByTestId } = render();
    await userEvent.click(getByRole("combobox"));
    await userEvent.click(getByRole("option", { name: optionsToSelect.name }));
    await userEvent.click(getByTestId("submit-button"));

    expect(onSubmit).toHaveBeenCalledWith({
      testField: optionsToSelect.value,
    });
  });
});
