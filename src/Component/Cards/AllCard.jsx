import React from "react";

import "./AllCard.css";
import { Card, CardImg, CardTitle, Col } from "react-bootstrap";

export const HomeCard = ({ CardItem }) => {
  return (
    <div className="homeCard" data-aos="zoom-in-up" data-aos-duration="3000">
      <CardImg
        src={CardItem.imgSrc}
        alt={CardItem.imgAlt}
        className="home-card-img"
      />
    </div>
  );
};

export const HomeBottomCard = ({ pitems }) => {
  return (
    <Col
      lg={4}
      md={6}
      sm={12}
      className="homeBottomCard"
      data-aos="zoom-in-up"
      data-aos-duration="3000"
    >
      <Card.Img
        src={pitems.imgSrc}
        alt={pitems.imgAlt}
        className="home-card-img2"
      />
      <Card.Body>
        <Card.Title className="text-custom">{pitems.title}</Card.Title>
        <Card.Text>{pitems.description}</Card.Text>
      </Card.Body>
    </Col>
  );
};

export function AbtUpperCard({ pitems }) {
  return (
    <Col lg={3} md={6} sm={12} className="p-4">
      <Card className="hover-shadow-box-animation abtcard">
        <Card.Img variant="top" src={pitems.image} alt="icon" />
        <Card.Body>
          <CardTitle className="fw-bold">{pitems.title}</CardTitle>
          <Card.Text>{pitems.body}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}
// export  AbtUpperCard;

export function AbtBottomCard({ pitems }) {
  return (
    <Col lg={4} md={12} sm={12} className="my-4">
      <Card className="abtcard">
        <Card.Img variant="top" src={pitems.image} alt="icon" />
        <Card.Body>
          <Card.Text>{pitems.body}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

// export  AbtBottomCard;
