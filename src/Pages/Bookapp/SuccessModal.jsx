import React from "react";
import { Modal, Button } from "react-bootstrap";

const SuccessModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ position: "relative" }}>Success</Modal.Title>
        <img
          src="/images/tick.png"
          alt=""
          style={{
            width: "90px",
            position: "absolute",
            top: "-40px",
            display: "flex",
            justifySelf: "anchor-center",
          }}
        />
      </Modal.Header>
      <Modal.Body>
        <p>Your appointment is successfully booked!</p>
        <p>Thank You for booking an appointment!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onHide}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default SuccessModal;
