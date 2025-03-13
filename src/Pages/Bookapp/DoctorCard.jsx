import React from "react";
import { Button, Card, CardTitle, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./doccard.css";

export default function DoctorCard({ dItems }) {
  return (
    <Col xl={3} lg={4} md={6} sm={12} className="p-4">
      <Card className="doccard align-items-center">
        <Card.Img
          src={dItems.img}
          alt="icon"
          className="mw-100"
          style={{ objectFit: "contain", backgroundColor: "#EAEFFF" }}
        />
        <Card.Body>
          <CardTitle className="docname fw-bold" style={{ color: "#007c9d" }}>
            {dItems.name}
          </CardTitle>
          <p>
            <strong>Speciality:</strong>
            {dItems.title}
          </p>
          <p>
            <strong>Hospital:</strong>
            {dItems.hospital}
          </p>
          <p>
            <strong>Experience:</strong>
            {dItems.experience}
          </p>
          <Button>
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={`/book-appointment/${dItems._id}`}
              state={{ doctor: dItems }}
            >
              BookNow
            </Link>
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
