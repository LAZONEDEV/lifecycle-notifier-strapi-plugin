import { Button, Dialog, Flex, Typography } from '@strapi/design-system';
import { Trash, WarningCircle } from '@strapi/icons';

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
    <Dialog.Root data-testid="dialog" onClose={onCancel} open={isVisible}>
      <Dialog.Content>
        <Dialog.Header>
          <Typography>Confirmation</Typography>
        </Dialog.Header>

        <Dialog.Body icon={<WarningCircle />}>
          <Flex direction="column" alignItems="center" gap={2}>
            <Flex justifyContent="center">
              <Typography id="confirm-description">
                Are you sure you want to delete this?
              </Typography>
            </Flex>
          </Flex>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Cancel>
            <Button data-testid="cancel-button" onClick={onCancel} variant="tertiary">
              Cancel
            </Button>
          </Dialog.Cancel>
          <Dialog.Action>
            <Button
              data-testid="confirm-button"
              variant="danger-light"
              startIcon={<Trash />}
              onClick={onConfirm}
            >
              Confirm
            </Button>
          </Dialog.Action>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DeleteSubscriptionDialog;
