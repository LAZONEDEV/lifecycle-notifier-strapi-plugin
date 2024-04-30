import React from "react";
import { ModalFooter, Button } from "@strapi/design-system";

interface FooterProps {
  onClose: () => void;
  editing?: boolean;
  isSubmitting: boolean;
  submitForm: () => void;
}

const Footer = ({
  isSubmitting,
  onClose,
  submitForm,
  editing,
}: FooterProps) => {
  return (
    <ModalFooter
      startActions={
        <Button
          data-testid="cancel-button"
          type="reset"
          onClick={onClose}
          variant="tertiary"
        >
          Cancel
        </Button>
      }
      endActions={
        <Button
          data-testid="submit-button"
          loading={isSubmitting}
          type="submit"
          onClick={submitForm}
        >
          {editing ? "Update subscription" : "Add subscription"}
        </Button>
      }
    />
  );
};

export default Footer;
