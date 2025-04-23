import React from "react";
import { Modal, Button } from "react-bootstrap";

const SuccessModal = ({
  show,
  onHide,
  title,
  message1,
  message2,
  message3,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ position: "relative" }}>
          {title || "Success"}
        </Modal.Title>
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
        <p>{message1 || "Your appointment is successfully booked!"}</p>
        <p>{message2 || "Thank You for booking an appointment!"}</p>
        <p>{message3}</p>
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
