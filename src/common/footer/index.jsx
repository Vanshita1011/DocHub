import React from "react";
import "./Footer.css";

import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook";
import {
  faInstagram,
  faLinkedin,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCopyright,
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footer-top">
          <div className="container-fluid p-4">
            <Row>
              <Col className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                <div className="footer-widget">
                  <div className="footer-logo">
                    <img src="/images/logo.png" alt="logo" className="logo" />
                  </div>
                  <div className="footer-about-content">
                    DocHub is a registered start up company empaneled with
                    10000+ Doctors, 500+ Hospitals, lives touched of more than 2
                    Million patients.
                  </div>
                  <div className="social-icon">
                    <ul>
                      <li>
                        <a
                          href="https://www.facebook.com/"
                          target="blank"
                          className="icon"
                        >
                          <FontAwesomeIcon icon={faFacebook} />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://x.com/?lang=en&mx=2"
                          target="blank"
                          className="icon"
                        >
                          <FontAwesomeIcon icon={faTwitter} />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.linkedin.com/feed/"
                          target="blank"
                          className="icon"
                        >
                          <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.instagram.com/?hl=en"
                          target="blank"
                          className="icon"
                        >
                          <FontAwesomeIcon icon={faInstagram} />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.youtube.com/"
                          target="blank"
                          className="icon"
                        >
                          <FontAwesomeIcon icon={faYoutube} />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                <div className="footer-widget">
                  <h2 className="footer-title">For Information</h2>
                  <ul>
                    <li>
                      <Link to={"/about-us"} className="link">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link to={"/about-us"} className="link">
                        Booking Guid
                      </Link>
                    </li>
                    <li>
                      <Link to={"/contact-us"} className="link">
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link to={"/contact-us"} className="link">
                        FAQ'S
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>

              <Col className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                <div className="footer-widget">
                  <h2 className="footer-title">Helpful Links</h2>
                  <ul>
                    <li>
                      <Link to={"/book-appoinment"} className="link">
                        Book Appoinment
                      </Link>
                    </li>
                    <li>
                      <Link to={"/book-appoinment"} className="link">
                        Search for doctors
                      </Link>
                    </li>
                    <li>
                      <Link to={"/book-appoinment"} className="link">
                        Search for hospitals
                      </Link>
                    </li>
                    <li>
                      <Link to={"/book-appoinment"} className="link">
                        SMS Booking
                      </Link>
                    </li>
                    <li>
                      <Link to={"/book-appoinment"} className="link">
                        Services
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>

              <Col className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                <div className="footer-widget">
                  <h2 className="footer-title">Contact Us</h2>
                  <div className="footer-contact-info">
                    <div className="footer-address">
                      <span>
                        <FontAwesomeIcon icon={faLocationDot} />
                      </span>
                      <p>DocHub CONSULTANCY PVT LTD, Ahmedabad,Gujarat.</p>
                    </div>
                    <div className="footer-address">
                      <span>
                        <FontAwesomeIcon icon={faPhone} />
                      </span>
                      <p>+91 9867654439</p>
                    </div>
                    <p>Customer Support:</p>
                    <div className="footer-address">
                      <span>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </span>
                      <p>support@dochub.com</p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <hr />

        <div className="container-fluid footer-bottom">
          <Row>
            <Col lg={6} md={6} sm={12}>
              <div className="copyright-text">
                <p>
                  <span>
                    <FontAwesomeIcon icon={faCopyright} />
                  </span>
                  2025 DocHub.All rights reserved.
                </p>
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className="copyright-menu">
                <ul className="policy-menu">
                  <li>
                    <Link to={"/terms"}>Terms and Conditions</Link>
                  </li>
                  <li>
                    <Link to={"/policy"}>Policy</Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
