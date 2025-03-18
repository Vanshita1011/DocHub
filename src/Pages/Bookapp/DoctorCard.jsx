import React from "react";
import { Button, Card, CardTitle, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./doccard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

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
          <Button className="rightArrow">
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={`/book-appointment/${dItems._id}`}
              state={{ doctor: dItems }}
            >
              BookNow
              <FontAwesomeIcon
                icon={faArrowRight}
                className="ms-2 fa-arrow-right"
              />
            </Link>
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
