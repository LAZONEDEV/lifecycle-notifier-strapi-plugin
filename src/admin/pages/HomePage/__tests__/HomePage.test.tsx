/* eslint-disable react/display-name */
import React from "react";
import { render, waitFor } from "@testing-library/react";
import HomePage from "../index";
import userEvent from "@testing-library/user-event";
import StrapiThemeProvider from "../../../testUtils/StrapiThemeProvider";
import ResizeObserver from "resize-observer-polyfill";

const reloadFn = jest.fn();
jest.mock("../../../hooks/subscription.ts", () => ({
  useSubscriptions: () => ({
    subscriptions: [],
    loading: false,
    reload: reloadFn,
  }),
}));

jest.mock(
  "../../../components/SubscriptionList/SubscriptionList.tsx",
  () => () => <div data-testid="mocked-subscription-list" />
);

jest.mock(
  "../../../components/Dialogs/SubscriptionDialog/SubscriptionDialog.tsx",
  () => () => <div data-testid="mocked-subscription-dialog" />
);

describe("test suite for HomePage component", () => {
  beforeEach(() => {
    global.ResizeObserver = ResizeObserver;
  });

  test("renders correctly", () => {
    const { getByText } = render(<HomePage />, {
      wrapper: StrapiThemeProvider,
    });

    expect(getByText("Lifecycle Notifier")).toBeInTheDocument();
    expect(getByText("Reload")).toBeInTheDocument();
  });

  test("opens modal when add new subscription button is clicked", async () => {
    const { getByText, getByTestId } = render(<HomePage />, {
      wrapper: StrapiThemeProvider,
    });
    userEvent.click(getByText("Add new subscription"));
    await waitFor(() => {
      expect(getByTestId("mocked-subscription-dialog")).toBeInTheDocument();
    });
  });

  test("should reload", async () => {
    const { getByText } = render(<HomePage />, {
      wrapper: StrapiThemeProvider,
    });
    await userEvent.click(getByText("Reload"));
    expect(reloadFn).toHaveBeenCalled();
  });
});
