import React from "react";
import CountUp from "react-countup";
import { Container, Row, Col } from "react-bootstrap";
import { useInView } from "react-intersection-observer";

const Counter = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <Container fluid className="counter-section text-center py-5 bg-light my-5">
      <h2
        className="fw-bold mb-4"
        // data-aos="fade-up"
        style={{ color: " #007c9d" }}
      >
        Our Achievements
      </h2>

      <Row className="justify-content-center">
        <Col
          md={3}
          xs={6}
          className="counter-box"
          // data-aos="zoom-in"
        >
          <h1 ref={ref} className="fw-bold" style={{ color: " #007c9d" }}>
            {inView && <CountUp start={0} end={100} duration={3} />}+
          </h1>
          <p className="fs-5">Doctors</p>
        </Col>

        <Col
          md={3}
          xs={6}
          className="counter-box"
          //  data-aos="zoom-in"
        >
          <h1 ref={ref} className="fw-bold" style={{ color: " #007c9d" }}>
            {inView && <CountUp start={0} end={5000} duration={3} />}+
          </h1>
          <p className="fs-5">Patients Treated</p>
        </Col>

        <Col
          md={3}
          xs={6}
          className="counter-box"
          // data-aos="zoom-in"
        >
          <h1 ref={ref} className=" fw-bold" style={{ color: " #007c9d" }}>
            {inView && <CountUp start={0} end={50} duration={3} />}+
          </h1>
          <p className="fs-5">Medical Services</p>
        </Col>

        <Col
          md={3}
          xs={6}
          className="counter-box"
          // data-aos="zoom-in"
        >
          <h1 ref={ref} className="fw-bold" style={{ color: " #007c9d" }}>
            {inView && <CountUp start={0} end={20} duration={3} />}+
          </h1>
          <p className="fs-5">Years of Experience</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Counter;
