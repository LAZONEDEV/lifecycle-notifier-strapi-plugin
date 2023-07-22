import React, { useState } from "react";
import { Plus } from "@strapi/icons";
import { Box, Button, HeaderLayout } from "@strapi/design-system";

import SubscriptionDialog from "../../components/Dialogs/SubscriptionDialog";

const HomePage = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Box>
      <HeaderLayout
        title="Lifecycle Notifier"
        primaryAction={
          <Button startIcon={<Plus />} onClick={() => setOpenModal(true)}>
            Add new subscription
          </Button>
        }
      />

      {openModal ? (
        <SubscriptionDialog
          onClose={() => setOpenModal(false)}
        />
      ) : (
        false
      )}
    </Box>
  );
};

export default HomePage;
