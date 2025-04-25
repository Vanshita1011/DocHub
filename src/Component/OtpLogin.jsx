import React, { useState } from "react";
import { Form, Button, Alert, Container, Card } from "react-bootstrap";
import api from "../axiosInterceptor";

const OtpLogin = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Enter OTP
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleGenerateOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/generate-otp", { email });
      setMessage(response.data.message);
      setError("");
      setStep(2); // Move to OTP verification step
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setMessage("");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/verify-otp", { email, otp });
      setMessage(response.data.message);
      setError("");
      // Redirect to dashboard or home page after successful login
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
      setMessage("");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow-lg" style={{ width: "400px" }}>
        <h3 className="text-center mb-3 fw-bold">Login with OTP</h3>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        {step === 1 ? (
          <Form onSubmit={handleGenerateOtp}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Send OTP
            </Button>
          </Form>
        ) : (
          <Form onSubmit={handleVerifyOtp}>
            <Form.Group className="mb-3">
              <Form.Label>OTP</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Verify OTP
            </Button>
          </Form>
        )}
      </Card>
    </Container>
  );
};

export default OtpLogin;
