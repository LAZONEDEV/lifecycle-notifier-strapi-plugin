import React, { useEffect, useState } from "react";
import { Plus } from "@strapi/icons";
import { Box, Button, HeaderLayout } from "@strapi/design-system";

import SubscriptionDialog from "../../components/Dialogs/SubscriptionDialog";
import SubscriptionList from "../../components/SubscriptionList/SubscriptionList";
import { SubscriptionEntry } from "../../../../common/types";
import { SubscriptionService } from "../../services/Subscription";
import { Refresh } from "@strapi/icons";

const HomePage = () => {
  const [onEditing, setOnEditing] = useState<undefined | SubscriptionEntry>();
  const [openModal, setOpenModal] = useState(false);
  const [subList, setSubList] = useState<SubscriptionEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSubs = () => {
    setLoading(true);
    SubscriptionService.get()
      .then((res) => setSubList(res))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadSubs();
  }, []);

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
            onClick={() => loadSubs()}
          >
            Reload
          </Button>
        }
      />

      <SubscriptionList
        subList={subList}
        loadSubs={loadSubs}
        onEdit={setOnEditing}
      />

      {openModal || onEditing ? (
        <SubscriptionDialog editing={onEditing} onClose={closeModal} />
      ) : null}
    </Box>
  );
};

export default HomePage;
