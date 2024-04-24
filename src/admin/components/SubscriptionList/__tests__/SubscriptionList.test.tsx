import React from "react";
import { SubscriptionEntry } from "../../../../common/types";
import StrapiThemeProvider from "../../../testUtils/StrapiThemeProvider";
import SubscriptionList from "../SubscriptionList";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SubscriptionService } from "../../../services/Subscription";

const subList = [
  {
    id: "1",
    subject: "Testing subs in config",
    collectionName: "api::planet.planet",
    eventType: "afterCreate",
    recipients: [
      {
        type: "CUSTOM",
        value: "custom@gmail.com",
      },
    ],
    content:
      "The planet <%= name %> has been discovered on <%= formattedDiscoveryDate %>!",
    mediaFields: ["image"],
    relations: [],
    interceptors: [],
  },
] as SubscriptionEntry[];

jest.mock("../../../services/Subscription", () => ({
  SubscriptionService: {
    delete: jest.fn().mockResolvedValue(void 0),
  },
}));

describe("suite test for SubscriptionList component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const { getByText } = render(
      <SubscriptionList
        onEdit={() => {}}
        subList={subList}
        loadSubs={() => {}}
      />,
      {
        wrapper: StrapiThemeProvider,
      }
    );

    expect(getByText(subList[0].subject)).toBeInTheDocument();
  });

  it("should call onEdit when edit button is clicked", async () => {
    const onEditMock = jest.fn();
    const { getByTestId } = render(
      <SubscriptionList
        onEdit={onEditMock}
        subList={subList}
        loadSubs={() => {}}
      />,
      {
        wrapper: StrapiThemeProvider,
      }
    );

    await userEvent.click(getByTestId("edit-button"));
    expect(onEditMock).toHaveBeenCalledWith(subList[0]);
  });

  it("should open modal and call SubscriptionService.delete when trying to delete a subscription and confirmed", async () => {
    const { getByTestId } = render(
      <SubscriptionList
        onEdit={() => {}}
        subList={subList}
        loadSubs={() => {}}
      />,
      {
        wrapper: StrapiThemeProvider,
      }
    );

    await userEvent.click(getByTestId("delete-button"));
    expect(getByTestId("dialog")).toBeInTheDocument();
    await userEvent.click(getByTestId("confirm-button"));
    expect(SubscriptionService.delete as jest.Mock).toHaveBeenCalledWith(
      subList[0].id
    );
  });

  it("should not call SubscriptionService.delete when deletion is canceled", async () => {
    const { getByTestId } = render(
      <SubscriptionList
        onEdit={() => {}}
        subList={subList}
        loadSubs={() => {}}
      />,
      {
        wrapper: StrapiThemeProvider,
      }
    );

    await userEvent.click(getByTestId("delete-button"));
    expect(getByTestId("dialog")).toBeInTheDocument();
    await userEvent.click(getByTestId("cancel-button"));
    expect(SubscriptionService.delete as jest.Mock).not.toHaveBeenCalled();
  });
});
