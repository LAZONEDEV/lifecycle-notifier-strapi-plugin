import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import {
  ModalLayout,
  ModalHeader,
  Typography,
  ModalFooter,
  Button,
  ModalBody,
  Grid,
  GridItem,
  Flex,
  Loader,
} from "@strapi/design-system";
import InputField from "../Inputs/InputField";
import SelectField from "../Inputs/SelectField";
import { EventType, eventTypes } from "../../../../common/config/eventType";
import { CollectionPicker } from "../Inputs/CollectionPicker";
import {
  filterApiCollection,
  loadCollectionsSchemas,
} from "../../utils/loadCollections";
import { CollectionSchema } from "../../types";
import { AttachableFilePicker } from "../Inputs/AttachableFilePicker";
import { RecipientPicker } from "../Inputs/RecipientPicker";
import TextareaField from "../Inputs/TextareaField";
import { SubscriptionEntry } from "../../../../common/types";

export interface SubscriptionDialogProps {
  onClose: () => void;
  editing?: SubscriptionEntry;
}

const initialValues: Partial<SubscriptionEntry> = {};

const SubscriptionDialog = ({ onClose, editing }: SubscriptionDialogProps) => {
  const [collections, setCollections] = useState<CollectionSchema[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const [request, abort] = loadCollectionsSchemas();
    request.then((result) => {
      const apiCollections = filterApiCollection(result.data.data);
      setCollections(apiCollections);
      setLoading(false)
    });

    return () => abort();
  }, []);

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
          initialValues={editing || (initialValues as SubscriptionEntry)}
          onSubmit={() => {}}
        >
          {() => (
            <>
              <ModalBody>
                <Form>
                  <Grid gap={4}>
                    <GridItem padding={1} col={12}>
                      <InputField
                        name="title"
                        label="Title"
                        placeholder="Subscription for ..."
                      />
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
                      <CollectionPicker name="collectionName" collections={collections} />
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

                    <GridItem padding={1} col={12}>
                      <TextareaField
                        label="Mail content"
                        rows={8}
                        name="content"
                        placeholder="Html code for the email content"
                      />
                    </GridItem>
                  </Grid>
                </Form>
              </ModalBody>

              <ModalFooter
                startActions={
                  <Button type="reset" onClick={onClose} variant="tertiary">
                    Cancel
                  </Button>
                }
                endActions={
                  <Button type="submit" onClick={() => {}}>
                    Add subscription
                  </Button>
                }
              />
            </>
          )}
        </Formik>
      )}
    </ModalLayout>
  );
};

export default SubscriptionDialog;
