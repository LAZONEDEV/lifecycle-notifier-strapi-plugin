import React, { useState } from "react";
import { Plus } from "@strapi/icons";
import { Box, Button, HeaderLayout } from "@strapi/design-system";

import SubscriptionList from "../../components/SubscriptionList/SubscriptionList";
import { SubscriptionEntry } from "../../../common/types";
import { Refresh } from "@strapi/icons";
import { useSubscriptions } from "../../hooks/subscription";
import SubscriptionDialog from "../../components/Dialogs/SubscriptionDialog/SubscriptionDialog";

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
      <HeaderLayout
        title="Lifecycle Notifier"
        primaryAction={
          <Button startIcon={<Plus />} onClick={() => setOpenModal(true)}>
            Add new subscription
          </Button>
        }
        secondaryAction={
          <Button
            loading={loading}
            variant="tertiary"
            startIcon={<Refresh />}
            onClick={reload}
          >
            Reload
          </Button>
        }
      />

      <SubscriptionList
        subList={subscriptions}
        loadSubs={reload}
        onEdit={setOnEditing}
      />

      {openModal || onEditing ? (
        <SubscriptionDialog editing={onEditing} onClose={closeModal} />
      ) : null}
    </Box>
  );
};

export default HomePage;
