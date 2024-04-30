import { render as renderRTL } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import StrapiThemeProvider from "../../../testUtils/StrapiThemeProvider";
import FieldFormikWrapper from "../../../testUtils/FieldFormikWrapper";
import { RecipientOptionType } from "../../../../common/types";
import { RecipientType } from "../../../../common/enums";
import { RecipientPicker, RecipientPickerProps } from "../RecipientPicker";
import { createRecipientLabel } from "../../../utils/createRecipientLabel";

const envRecipients: RecipientOptionType[] = [
  {
    type: RecipientType.ENV,
    value: "env1",
  },
];
const activeCollectionEmailFields = ["email1", "email2"];
const activeCollection = "Test-Active-collection";
const formikContextInitialValue = {
  recipients: [envRecipients[0]],
  collection: `api.${activeCollection}`,
};
jest.mock("../../../hooks/collection.ts", () => ({
  useCollectionFieldType: jest.fn(() => activeCollectionEmailFields),
}));
jest.mock("../../../hooks/recipients.ts", () => ({
  useRecipients: jest.fn(() => envRecipients),
}));
const onSubmit = jest.fn();

const Component = (
  props: Partial<Omit<RecipientPickerProps, "aria-label">>
) => (
  <FieldFormikWrapper
    initialValues={formikContextInitialValue}
    onSubmit={onSubmit}
  >
    <RecipientPicker
      collections={[]}
      collectionFormName="collection"
      name="recipients"
      {...props}
    />
  </FieldFormikWrapper>
);

const render = (props: Partial<RecipientPickerProps> = {}) =>
  renderRTL(<Component {...props} />, { wrapper: StrapiThemeProvider });

describe("test suite for AttachableFilePicker component", () => {
  it("should render the select and the options", async () => {
    const option1Label = createRecipientLabel(
      envRecipients[0],
      activeCollection
    );
    const option2Label = createRecipientLabel(
      {
        type: RecipientType.FROM_MODEL,
        value: activeCollectionEmailFields[0],
      },
      activeCollection
    );
    const option3Label = createRecipientLabel(
      {
        type: RecipientType.FROM_MODEL,
        value: activeCollectionEmailFields[1],
      },
      activeCollection
    );

    const { getByRole } = render();

    expect(getByRole("combobox")).toBeInTheDocument();

    await userEvent.click(getByRole("combobox"));

    expect(
      getByRole("option", {
        name: option1Label,
      })
    ).toBeInTheDocument();
    expect(
      getByRole("option", {
        name: option2Label,
      })
    ).toBeInTheDocument();
    expect(
      getByRole("option", {
        name: option3Label,
      })
    ).toBeInTheDocument();
  });

  it("should update formik context", async () => {
    const recipientToSelect = {
      type: RecipientType.FROM_MODEL,
      value: activeCollectionEmailFields[1],
    };
    const optionToSelect = createRecipientLabel(
      recipientToSelect,
      activeCollection
    );
    const expectValue = {
      ...formikContextInitialValue,
      recipients: [envRecipients[0], recipientToSelect],
    };

    const { getByRole, getByTestId } = render();
    await userEvent.click(getByRole("combobox"));
    await userEvent.click(getByRole("option", { name: optionToSelect }));
    await userEvent.click(getByTestId("submit-button"));

    expect(onSubmit).toHaveBeenCalledWith(expectValue);
  });

  it("should clear the context value when the X button is clicked", async () => {
    const { getByRole, getByTestId } = render();  
    await userEvent.keyboard("[Escape]");

    await userEvent.click(getByRole("button", { name: "Clear" }));
    await userEvent.click(getByTestId("submit-button"));

    expect(onSubmit).toHaveBeenCalledWith({
      ...formikContextInitialValue,
      recipients: [],
    });
  });
});
