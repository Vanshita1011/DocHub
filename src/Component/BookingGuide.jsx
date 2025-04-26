import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BookingGuide.css";

// Sample Images (Replace with actual images)
// import registerImage from "./about-img.jpg";
// import doctorImage from "./assets/doctor.png";

const BookingGuide = () => {
  return (
    <Container className="booking-guide-container my-5">
      <h2 className="text-center mb-4">How to Book an Appointment</h2>
      <Row className="justify-content-center">
        {/* Step 1: Register/Login */}
        <Col md={5} className="mb-4">
          <Card className="shadow-sm">
            {/* <Card.Img variant="top" src={registerImage} alt="Register/Login" /> */}
            <Card.Body className="text-center">
              <Card.Title>Step 1: Register or Login</Card.Title>
              <Card.Text>
                - Register for a new account or login if you're already a
                member.
                <br />- Securely manage your appointments and profile.
              </Card.Text>
              <Link to="/signIn">
                <Button variant="primary">Get Started</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        {/* Step 2: Choose a Doctor */}
        <Col md={5}>
          <Card className="booking-step-card shadow-sm">
            {/* <Card.Img variant="top" src={doctorImage} alt="Choose a Doctor" /> */}
            <Card.Body className="text-center">
              <Card.Title>Step 2: Choose Your Doctor</Card.Title>
              <Card.Text>
                - Browse through our list of experienced doctors.
                <br />- Select your preferred time and date for the appointment.
              </Card.Text>
              <Link to="/book-appoinment">
                <Button variant="success">View Doctors</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Final Step: Confirmation */}
      <div className="text-center mt-5">
        <h3>You're All Set!</h3>
        <p>
          After booking, your appointment details will appear in your profile.
        </p>
        <Link to="/profile">
          <Button variant="outline-info" style={{ width: "37%" }}>
            View Profile
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default BookingGuide;
