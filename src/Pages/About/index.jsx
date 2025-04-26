import React, { useState } from "react";
import "./About.css";
import { Container, Row, Col } from "react-bootstrap";
import ScrollToTop from "react-scroll-to-top";
import { abtBottomCard, abtUpperCard } from "../../Component/Cards/AllCardData";
import { AbtBottomCard, AbtUpperCard } from "../../Component/Cards/AllCard";

export default function About() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div>
        <div className="abt text-center p-3">
          <h1 className="p-2 fw-bold text-custom">About DocHub</h1>
          <p className="p-3 ">Take A Right Step For Your Life</p>
        </div>
        <section className="about-area-two">
          <Container>
            <Row className="justify-content-center ">
              <Col lg={6} className="about-img">
                <img src="images/about-img.jpg" alt="img" className="mw-100" />
              </Col>
              <Col lg={6}>
                <div className="about-content-two about-content">
                  <h2 className=" text-custom">
                    Tackle The Challenge Of Delivering Health Care
                  </h2>
                  <p>
                    Welcome to <span>DOCHUB</span>, where compassionate care
                    meets medical excellence. Our mission is to provide
                    personalized healthcare that empowers you to lead a
                    healthier, happier life.
                  </p>
                  <p>
                    We are here to guide, support, and care for you every step
                    of the way. At <span>DOCHUB</span>, we treat every patient
                    like family, ensuring that your well-being is always our top
                    priority.
                  </p>
                  {isExpanded && (
                    <p className="para">
                      With over <span>5+ Years</span> of clinical experience,
                      Dr. is dedicated to providing comprehensive care that
                      focuses on prevention, diagnosis, and management of a wide
                      range of conditions, including diabetes management,
                      cardiovascular health, and women's health.
                    </p>
                  )}
                  <button onClick={toggleContent} className="p-3">
                    {isExpanded ? "Read Less" : "Read More"}
                  </button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <div className="functions">
          <h2 className="text-center text-custom">
            The Simplest Interface For Finding Healthcare
          </h2>
          <section>
            <Container>
              <Row className="justify-content-between cards">
                {abtUpperCard.map((v, i) => (
                  <AbtUpperCard pitems={v} key={i} />
                ))}
              </Row>
            </Container>
          </section>
        </div>

        <section className="about-us-section text-center">
          <Container>
            <Row>
              <Col lg={6} md={12} sm={12} xs={12}>
                <h2 className="heading p-4 text-custom">Our Vision</h2>
                <p className="p-2">
                  To revolutionize healthcare by creating a trusted, accessible,
                  and innovative platform that empowers individuals to take
                  charge of their health while fostering seamless connections
                  between patients and healthcare providers.
                </p>
              </Col>
              <Col lg={6} md={12} sm={12} xs={12}>
                <h2 className="heading p-4 text-custom">Our Mission</h2>
                <p className="p-2">
                  Providing a comprehensive, user-friendly platform for patients
                  to access trusted medical professionals, resources, and tools.
                </p>
              </Col>
            </Row>
          </Container>
        </section>

        <section>
          <Container>
            <Row className="justify-content-between">
              {abtBottomCard.map((v, i) => (
                <AbtBottomCard pitems={v} key={i} />
              ))}
            </Row>
          </Container>
        </section>
        <ScrollToTop smooth color="#028885" />
      </div>
    </>
  );
}
