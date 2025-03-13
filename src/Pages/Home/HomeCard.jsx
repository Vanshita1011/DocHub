import React from "react";

import "./HomeCard.css";
import { Card, Col } from "react-bootstrap";

export const HomeCard = ({ imgSrc, imgAlt }) => {
  return (
    <div
      className="homeCard"
      // data-aos="flip-left" data-aos-duration="3000"
    >
      {imgSrc && imgAlt && (
        <img src={imgSrc} alt={imgAlt} className="home-card-img" />
      )}
    </div>
  );
};
export const HomeCard2 = ({ imgSrc, imgAlt, title, description }) => {
  return (
    <Col
      lg={3}
      md={6}
      sm={6}
      className="homeCard2"
      // data-aos="zoom-in-up"
      // data-aos-duration="3000"
    >
      {imgSrc && imgAlt && (
        <img src={imgSrc} alt={imgAlt} className="home-card-img2" />
      )}
      <Card.Body className="object-fit-contain p-3">
        <Card.Title className="mb-2">
          {title && (
            <h5
              className="card-title fw-bold"
              style={{ color: "rgb(0, 124, 157)" }}
            >
              {title}
            </h5>
          )}
        </Card.Title>
        {description && <p className="card-description">{description}</p>}
      </Card.Body>
    </Col>
  );
};
