import React from "react";
import {
  Dialog,
  DialogBody,
  Flex,
  Typography,
  DialogFooter,
  Button,
} from "@strapi/design-system";
import { ExclamationMarkCircle } from "@strapi/icons";
import { Trash } from "@strapi/icons";

interface DeleteSubscriptionDialogProps {
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteSubscriptionDialog = ({
  isVisible,
  onConfirm,
  onCancel,
}: DeleteSubscriptionDialogProps) => {
  return (
    <Dialog
      data-testid="dialog"
      onClose={onCancel}
      title="Confirmation"
      isOpen={isVisible}
    >
      <DialogBody icon={<ExclamationMarkCircle />}>
        <Flex direction="column" alignItems="center" gap={2}>
          <Flex justifyContent="center">
            <Typography id="confirm-description">
              Are you sure you want to delete this?
            </Typography>
          </Flex>
        </Flex>
      </DialogBody>

      <DialogFooter
        startAction={
          <Button data-testid="cancel-button" onClick={onCancel} variant="tertiary">
            Cancel
          </Button>
        }
        endAction={
          <Button
            data-testid="confirm-button"
            variant="danger-light"
            startIcon={<Trash />}
            onClick={onConfirm}
          >
            Confirm
          </Button>
        }
      />
    </Dialog>
  );
};

export default DeleteSubscriptionDialog;
