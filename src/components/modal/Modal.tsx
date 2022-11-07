import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface ModalProps {
  heading: string;
  isOpen: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
  buttonText: string;
}

/**
 * ModalContainer.
 * To be inserted directly in any page.
 *
 * @example
 * ```
 * <Modal
 *    heading={`${coinsDetails?.name} Details` || ''}
 *    isOpen={isModalOpen}
 *    onDismiss={() => {onDismiss}}
 *    buttonText="Close"
 * />
 * ```
 */

const ModalContainer: React.FC<ModalProps> = ({
  heading,
  isOpen,
  onDismiss,
  children,
  buttonText,
}) => {
  return (
    <>
      <Modal show={isOpen} onHide={onDismiss} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onDismiss}>
            {buttonText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalContainer;
