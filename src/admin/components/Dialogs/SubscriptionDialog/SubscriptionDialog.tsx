import React from "react";
import { Formik, Form } from "formik";
import {
  ModalLayout,
  ModalHeader,
  Typography,
  ModalBody,
  Grid,
  GridItem,
  Flex,
  Loader,
} from "@strapi/design-system";
import InputField from "../../Inputs/InputField";
import SelectField from "../../Inputs/SelectField";
import { EventType, eventTypes } from "../../../../common/config/eventType";
import { CollectionPicker } from "../../Inputs/CollectionPicker";
import { AttachableFilePicker } from "../../Inputs/AttachableFilePicker";
import { RecipientPicker } from "../../Inputs/RecipientPicker";
import TextareaField from "../../Inputs/TextareaField";
import { SubscriptionEntry } from "../../../../common/types";
import { SubscriptionService } from "../../../services/Subscription";
import { subscriptionFormValidationSchema } from "../../../utils/formValidation";
import { RelationPicker } from "../../Inputs/RelationPicker";
import { InterceptorPicker } from "../../Inputs/InterceptorPicker";
import { useCollections } from "../../../hooks/getCollections";
import Footer from "./../SubscriptionDialog/Footer";

export interface SubscriptionDialogProps {
  onClose: () => void;
  editing?: SubscriptionEntry;
}

const initialValues: Partial<SubscriptionEntry> = {};

const SubscriptionDialog = ({ onClose, editing }: SubscriptionDialogProps) => {
  const { collections, loading } = useCollections();

  const onSubmit = async (values: SubscriptionEntry) => {
    if (editing) {
      await SubscriptionService.update(editing.id, values);
    } else {
      await SubscriptionService.create(values);
    }
    onClose();
  };

  return (
    <ModalLayout labelledBy="add-subscription-title" onClose={onClose}>
      <ModalHeader>
        <Typography id="add-subscription-title" fontWeight="bold">
          Subscription Management
        </Typography>
      </ModalHeader>
      {loading ? (
        <Flex padding={10} justifyContent="center">
          <Loader />
        </Flex>
      ) : (
        <Formik<SubscriptionEntry>
          validationSchema={subscriptionFormValidationSchema}
          initialValues={editing || (initialValues as SubscriptionEntry)}
          onSubmit={onSubmit}
        >
          {({ submitForm, isSubmitting }) => (
            <>
              <ModalBody>
                <Form>
                  <Grid gap={4}>
                    <GridItem padding={1} col={12}>
                      <InputField name="subject" label="Subject" />
                    </GridItem>

                    <GridItem padding={1} col={6}>
                      <SelectField<EventType>
                        name="eventType"
                        label="Event to listen"
                        placeholder="Select an event type"
                        getName={(item) => item.name}
                        options={eventTypes}
                      />
                    </GridItem>

                    <GridItem padding={1} col={6}>
                      <CollectionPicker
                        name="collectionName"
                        collections={collections}
                      />
                    </GridItem>

                    <GridItem padding={1} col={6}>
                      <AttachableFilePicker
                        collectionFormName="collectionName"
                        name="mediaFields"
                        collections={collections}
                        label="Selection file to join"
                        placeholder="Select field"
                      />
                    </GridItem>

                    <GridItem padding={1} col={6}>
                      <RecipientPicker
                        collectionFormName="collectionName"
                        name="recipients"
                        collections={collections}
                        label="Select recipient"
                        placeholder="Select recipients"
                      />
                    </GridItem>

                    <GridItem padding={1} col={6}>
                      <RelationPicker
                        collectionFieldName="collectionName"
                        name="relations"
                        collections={collections}
                        label="Relations to populate"
                        placeholder="Select relations to populate"
                      />
                    </GridItem>

                    <GridItem padding={1} col={6}>
                      <InterceptorPicker name="interceptors" />
                    </GridItem>

                    <GridItem padding={1} col={12}>
                      <TextareaField
                        label="Template"
                        name="content"
                        placeholder="Template code for the mail"
                        hint="You can inject the entry data using this syntax <%= fieldName %>."
                      />
                    </GridItem>
                  </Grid>
                </Form>
              </ModalBody>

              <Footer
                isSubmitting={isSubmitting}
                onClose={onClose}
                submitForm={submitForm}
                editing={!!editing}
              />
            </>
          )}
        </Formik>
      )}
    </ModalLayout>
  );
};

export default SubscriptionDialog;
