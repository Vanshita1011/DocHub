import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const DownloadSection = () => {
  return (
    <section className="section-download">
      <Container>
        <Row>
          <Col lg={6} md={12} sm={12}>
            <div className="dbanner">
              <img src="images/downloadbanner.png" alt="app_mobile" />
            </div>
          </Col>
          <Col lg={6} md={12} sm={12}>
            <div className="app-center p-5 text-center">
              <h2 className="p-3">Download DocHub App</h2>
              <p>Book appointment & health checkups;</p>
              <p>Online lab test & consult doctor online</p>
              <p>Get the link to download the app</p>
              <div className="download-btn pt-5">
                <a
                  href="https://play.google.com/store/games?hl=en"
                  target="blank"
                >
                  <img src="images/play-store.png" alt="" className="p-2" />
                  Play Store
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default DownloadSection;
