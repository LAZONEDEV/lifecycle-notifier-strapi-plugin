import { Box, Button, Flex, Typography } from '@strapi/design-system';
import { ArrowClockwise, Plus } from '@strapi/icons';
import { useState } from 'react';
import { SubscriptionEntry } from '../common/types';
import SubscriptionDialog from '../components/Dialogs/SubscriptionDialog/SubscriptionDialog';
import SubscriptionList from '../components/SubscriptionList/SubscriptionList';
import { useSubscriptions } from '../hooks/subscription';

const HomePage = () => {
  const [onEditing, setOnEditing] = useState<undefined | SubscriptionEntry>();
  const [openModal, setOpenModal] = useState(false);
  const { subscriptions, loading, reload } = useSubscriptions();

  const closeModal = () => {
    setOpenModal(false);
    if (onEditing) setOnEditing(undefined);
  };

  return (
    <Box>
      <Flex justifyContent="space-between" paddingTop={6} paddingLeft={10} paddingRight={10}>
        <Typography variant="alpha" fontWeight="bold">
          Lifecycle Notifier
        </Typography>

        <Flex direction="row" gap="4" alignItems="center">
          <Button
            loading={loading}
            variant="tertiary"
            startIcon={<ArrowClockwise />}
            onClick={reload}
          >
            Reload
          </Button>

          <Button startIcon={<Plus />} onClick={() => setOpenModal(true)}>
            Add new subscription
          </Button>
        </Flex>
      </Flex>
      <SubscriptionList subList={subscriptions} loadSubs={reload} onEdit={setOnEditing} />

      {openModal || onEditing ? (
        <SubscriptionDialog editing={onEditing} onClose={closeModal} />
      ) : null}
    </Box>
  );
};

export default HomePage;
