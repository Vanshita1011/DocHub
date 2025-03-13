import React from "react";
import {
  faArrowRight,
  faCalendar,
  faComment,
  faHeart,
  faShareNodes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./servicecard.css";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ServiceCard({ service }) {
  return (
    <Col lg={4} md={4} sm={12} className="mb-4">
      <Card>
        <Card.Img
          variant="top"
          src={service.img}
          alt="icon"
          className="img-fluid blogimg"
          style={{ width: "420px" }}
        />
        <ul className="d-flex">
          <li className="d-flex p-2">
            <p>
              <FontAwesomeIcon
                icon={faUser}
                className="blogicon"
                style={{ marginRight: "7px" }}
              />
              Admin
            </p>
          </li>
          <li className="d-flex p-2">
            <p>
              <FontAwesomeIcon
                icon={faCalendar}
                className="blogicon"
                style={{ marginRight: "7px" }}
              />
              {service.date}
            </p>
          </li>
        </ul>
        <Card.Body>
          <Card.Title className="blogtitle p-2">{service.title}</Card.Title>
          <p className="p-2">{service.data}</p>
        </Card.Body>
        <div className="d-flex p-3 justify-content-between w-100 mw-100">
          <button className="bg-primary blogbtn">
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={`/blog/${service.id}`}
            >
              Read More <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </button>
          <div className="d-flex icongroup ">
            <FontAwesomeIcon icon={faComment} className="p-1" />5
            <FontAwesomeIcon icon={faHeart} className="p-1" />
            20
            <FontAwesomeIcon icon={faShareNodes} className="p-1" />
            15
          </div>
        </div>
      </Card>
    </Col>
  );
}
