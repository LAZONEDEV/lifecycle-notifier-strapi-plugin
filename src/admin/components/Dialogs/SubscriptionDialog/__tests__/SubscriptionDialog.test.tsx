import React from "react";
import { render, waitFor } from "@testing-library/react";
import SubscriptionDialog from "../SubscriptionDialog";

import StrapiThemeProvider from "../../../../testUtils/StrapiThemeProvider";
import { EventType } from "../../../../../common/enums";
import userEvent from "@testing-library/user-event";
import { selectOption } from "../../../../testUtils/selectionOption";
import {
  collections,
  interceptors,
  planetCollection,
  recipients,
} from "./fakeData";
import { createRecipientLabel } from "../../../../utils/createRecipientLabel";
import { SubscriptionService } from "../../../../services/Subscription";
import { SubscriptionEntry } from "../../../../../common/types";
import { useCollections } from "../../../../hooks/getCollections";

// mock modules
jest.mock("../../../../hooks/getCollections", () => ({
  useCollections: jest.fn(),
}));

jest.mock("../../../../hooks/recipients.ts", () => ({
  useRecipients: () => recipients,
}));

jest.mock("../../../../hooks/interceptors.ts", () => ({
  useInterceptorsOptions: () => interceptors,
}));

jest.mock("../../../../services/Subscription", () => ({
  SubscriptionService: {
    create: jest.fn(),
    update: jest.fn(),
  },
}));

jest.mock("../../../../services/Config.ts", () => ({
  ConfigService: {
    getEnvRecipients: jest.fn().mockResolvedValue(["r1"]),
  },
}));

jest.mock("../../../../services/Interceptor.ts", () => ({
  InterceptorService: {
    getInterceptors: jest.fn().mockResolvedValue(["int1"]),
  },
}));

// create test constants
const fieldLabels: Record<string, string> = {
  subject: "Subject",
  event: "Event to listen",
  collection: "Related collection",
  media: "Select files to join",
  recipients: "Select recipient",
  relations: "Relations to populate",
  interceptors: "Interceptor to apply",
  template: "Template",
  submitButton: "Add subscription",
};

const testInputs = {
  subject: "test-subject",
  eventType: EventType.AfterCreate,
  collectionName: planetCollection.uid,
  mediaFields: ["image"],
  recipients: [recipients[0]],
  relations: ["by"],
  interceptors: [interceptors[0].name],
  content: "Template",
} as SubscriptionEntry;

describe("test suite for SubscriptionDialog component", () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    (useCollections as jest.Mock).mockReturnValue({
      collections,
      loading: false,
    });
  });

  it("should show loader when collections in loading", () => {
    const onClose = jest.fn();
    (useCollections as jest.Mock).mockReturnValue({
      collections: [],
      loading: true,
    });
    const { getByTestId } = render(<SubscriptionDialog onClose={onClose} />, {
      wrapper: StrapiThemeProvider,
    });

    expect(getByTestId("loader")).toBeInTheDocument();
  });

  it("should render correctly", () => {
    const onClose = jest.fn();
    const { getByText } = render(<SubscriptionDialog onClose={onClose} />, {
      wrapper: StrapiThemeProvider,
    });

    expect(getByText("Subscription Management")).toBeInTheDocument();
    Object.keys(fieldLabels).forEach((key) => {
      const label = fieldLabels[key];
      expect(getByText(label)).toBeInTheDocument();
    });
  });

  it("should call SubscriptionService.create when submitting a new subscription", async () => {
    const onClose = jest.fn();
    const { getByRole } = render(<SubscriptionDialog onClose={onClose} />, {
      wrapper: StrapiThemeProvider,
    });

    const subjectField = getByRole("textbox", { name: fieldLabels.subject });
    await userEvent.type(subjectField, testInputs.subject);

    // select event type
    await selectOption(fieldLabels.event, testInputs.eventType, getByRole);

    // select collection
    await selectOption(
      fieldLabels.collection,
      planetCollection.info?.name!,
      getByRole
    );

    // select recipients
    await selectOption(
      fieldLabels.recipients,
      createRecipientLabel(
        testInputs.recipients[0],
        planetCollection.info?.name!
      ),
      getByRole
    );

    // select file to join
    await selectOption(fieldLabels.media, testInputs.mediaFields[0], getByRole);

    // select relations
    await selectOption(
      fieldLabels.relations,
      testInputs?.relations?.[0],
      getByRole
    );

    // select interceptors
    await selectOption(
      fieldLabels.interceptors,
      testInputs?.interceptors?.[0],
      getByRole
    );

    // fill template
    const templateField = getByRole("textbox", { name: fieldLabels.template });
    await userEvent.type(templateField, testInputs.content);

    const submitButton = getByRole("button", {
      name: fieldLabels.submitButton,
    });
    await userEvent.click(submitButton);

    expect(SubscriptionService.create as jest.Mock).toHaveBeenCalledWith(
      testInputs
    );
    expect(onClose).toHaveBeenCalled();
  });

  it("should fill all fields with the provided value for edition", async () => {
    const onClose = jest.fn();
    const { getByRole } = render(
      <SubscriptionDialog editing={testInputs} onClose={onClose} />,
      {
        wrapper: StrapiThemeProvider,
      }
    );

    expect(getByRole("textbox", { name: fieldLabels.subject })).toHaveValue(
      testInputs.subject
    );

    expect(getByRole("textbox", { name: fieldLabels.template })).toHaveValue(
      testInputs.content
    );

    await waitFor(() => {
      expect(
        getByRole("combobox", { name: fieldLabels.event })
      ).toHaveTextContent(testInputs.eventType);

      expect(
        getByRole("combobox", { name: fieldLabels.collection })
      ).toHaveTextContent(planetCollection.info?.name!);

      expect(
        getByRole("combobox", { name: fieldLabels.recipients })
      ).toHaveTextContent(
        createRecipientLabel(
          testInputs.recipients[0],
          planetCollection.info?.name!
        )
      );

      expect(
        getByRole("combobox", { name: fieldLabels.media })
      ).toHaveTextContent(testInputs.mediaFields[0]);

      expect(
        getByRole("combobox", { name: fieldLabels.relations })
      ).toHaveTextContent(testInputs?.relations?.[0]!);

      expect(
        getByRole("combobox", { name: fieldLabels.interceptors })
      ).toHaveTextContent(testInputs?.interceptors?.[0]!);
    });
  });

  it("should call SubscriptionService.update when submitting an edited subscription", async () => {
    const onClose = jest.fn();
    const newSubject = "new-subject";
    const testSubId = "1";
    const { getByRole } = render(
      <SubscriptionDialog
        editing={{ ...testInputs, id: testSubId }}
        onClose={onClose}
      />,
      {
        wrapper: StrapiThemeProvider,
      }
    );

    const subjectField = getByRole("textbox", { name: fieldLabels.subject });
    await userEvent.clear(subjectField);
    await userEvent.type(subjectField, newSubject);

    const submitButton = getByRole("button", {
      name: "Update subscription",
    });
    await userEvent.click(submitButton);

    expect(SubscriptionService.update as jest.Mock).toHaveBeenCalledWith(
      testSubId,
      { ...testInputs, subject: newSubject, id: testSubId }
    );
    expect(onClose).toHaveBeenCalled();
  });
});
