import { Flex, Grid, Loader, Modal, Typography } from '@strapi/design-system';
import { Form, Formik } from 'formik';
import { EventType, eventTypes } from '../../../common/config/eventType';
import { SubscriptionEntry } from '../../../common/types';
import { useCollections } from '../../../hooks/getCollections';
import { SubscriptionService } from '../../../services/Subscription';
import { subscriptionFormValidationSchema } from '../../../utils/formValidation';
import { AttachableFilePicker } from '../../Inputs/AttachableFilePicker';
import { CollectionPicker } from '../../Inputs/CollectionPicker';
import InputField from '../../Inputs/InputField';
import { InterceptorPicker } from '../../Inputs/InterceptorPicker';
import { RecipientPicker } from '../../Inputs/RecipientPicker';
import { RelationPicker } from '../../Inputs/RelationPicker';
import SelectField from '../../Inputs/SelectField';
import TextareaField from '../../Inputs/TextareaField';
import Footer from './../SubscriptionDialog/Footer';
import useUserAuth from '../../../hooks/auth';

export interface SubscriptionDialogProps {
  onClose: () => void;
  editing?: SubscriptionEntry;
}

const initialValues: Partial<SubscriptionEntry> = {
  subject: '',
  collectionName: '',
  mediaFields: [],
  recipients: [],
  relations: [],
  interceptors: [],
  content: '',
};

const SubscriptionDialog = ({ onClose, editing }: SubscriptionDialogProps) => {
  const authToken = useUserAuth();
  const { collections, loading } = useCollections(authToken);

  const onSubmit = async (values: SubscriptionEntry) => {
    if (editing) {
      await SubscriptionService.update(editing.documentId, values, authToken);
    } else {
      await SubscriptionService.create(values, authToken);
    }
    onClose();
  };

  return (
    <Modal.Root defaultOpen labelledBy="add-subscription-title" onOpenChange={onClose}>
      <Modal.Content>
        <Modal.Header>
          <Typography id="add-subscription-title" fontWeight="bold">
            Subscription Management
          </Typography>
        </Modal.Header>
        {loading ? (
          <Flex data-testid="loader" padding={10} justifyContent="center">
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
                <Form>
                  <Modal.Body>
                    <Grid.Root gap={4}>
                      <Grid.Item
                        padding={1}
                        col={12}
                        xs={12}
                        direction="column"
                        alignItems="stretch"
                      >
                        <InputField required placeholder="Subject" name="subject" label="Subject" />
                      </Grid.Item>

                      <Grid.Item
                        padding={1}
                        col={6}
                        xs={12}
                        direction="column"
                        alignItems="stretch"
                      >
                        <SelectField<EventType>
                          required
                          name="eventType"
                          label="Event to listen"
                          placeholder="Select an event type"
                          getName={(item) => item.name}
                          options={eventTypes}
                        />
                      </Grid.Item>

                      <Grid.Item
                        padding={1}
                        col={6}
                        xs={12}
                        direction="column"
                        alignItems="stretch"
                      >
                        <CollectionPicker
                          required
                          name="collectionName"
                          collections={collections}
                        />
                      </Grid.Item>

                      <Grid.Item
                        padding={1}
                        col={6}
                        xs={12}
                        direction="column"
                        alignItems="stretch"
                      >
                        <AttachableFilePicker
                          collectionFormName="collectionName"
                          name="mediaFields"
                          collections={collections}
                          label="Select files to join"
                          placeholder="Select field"
                        />
                      </Grid.Item>

                      <Grid.Item
                        padding={1}
                        col={6}
                        xs={12}
                        direction="column"
                        alignItems="stretch"
                      >
                        <RecipientPicker
                          required
                          collectionFormName="collectionName"
                          name="recipients"
                          collections={collections}
                          label="Select recipient"
                          placeholder="Select recipients"
                        />
                      </Grid.Item>

                      <Grid.Item
                        padding={1}
                        col={6}
                        xs={12}
                        direction="column"
                        alignItems="stretch"
                      >
                        <RelationPicker
                          collectionFieldName="collectionName"
                          name="relations"
                          collections={collections}
                          label="Relations to populate"
                          placeholder="Select relations to populate"
                        />
                      </Grid.Item>

                      <Grid.Item
                        padding={1}
                        col={6}
                        xs={12}
                        direction="column"
                        alignItems="stretch"
                      >
                        <InterceptorPicker name="interceptors" />
                      </Grid.Item>

                      <Grid.Item
                        padding={1}
                        col={12}
                        s={12}
                        direction="column"
                        alignItems="stretch"
                      >
                        <TextareaField
                          required
                          label="Template"
                          name="content"
                          placeholder="Template code for the mail"
                          hint="You can inject the entry data using this syntax <%= fieldName %>."
                        />
                      </Grid.Item>
                    </Grid.Root>
                  </Modal.Body>

                  <Footer
                    isSubmitting={isSubmitting}
                    onClose={onClose}
                    submitForm={submitForm}
                    editing={!!editing}
                  />
                </Form>
              </>
            )}
          </Formik>
        )}
      </Modal.Content>
    </Modal.Root>
  );
};

export default SubscriptionDialog;
