import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function DeleteConfirmationModal({
  show,
  onClose,
  onConfirm,
  message1,
  message2,
}) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message1 || "Are you sure you want to delete this doctor?"}</p>
        {/* <p>{message2 || "Are you sure you want to Remove this User?"}</p> */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
