import { Button, Modal } from '@strapi/design-system';

interface FooterProps {
  onClose: () => void;
  editing?: boolean;
  isSubmitting: boolean;
  submitForm: () => void;
}

const Footer = ({ isSubmitting, onClose, submitForm, editing }: FooterProps) => {
  return (
    <Modal.Footer>
      <Modal.Close>
        <Button data-testid="cancel-button" type="reset" onClick={onClose} variant="tertiary">
          Cancel
        </Button>
      </Modal.Close>
      <Button data-testid="submit-button" loading={isSubmitting} type="submit" onClick={submitForm}>
        {editing ? 'Update subscription' : 'Add subscription'}
      </Button>
    </Modal.Footer>
  );
};

export default Footer;
