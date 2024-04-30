import { ByRoleMatcher, ByRoleOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export const selectOption = async (
  fieldLabel: string,
  optionToSelect: string = "",
  getByRole: (
    role: ByRoleMatcher,
    options?: ByRoleOptions | undefined
  ) => HTMLElement
) => {
  const eventSelector = getByRole("combobox", { name: fieldLabel });
  await userEvent.click(eventSelector);
  await userEvent.click(getByRole("option", { name: optionToSelect }));
  await userEvent.keyboard("[Escape]");
  
};
