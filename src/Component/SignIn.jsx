import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Alert,
  Container,
  Card,
  InputGroup,
} from "react-bootstrap";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import api from "../axiosInterceptor";
import { useUser } from "../UserContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false); // Track if OTP is sent
  const [timer, setTimer] = useState(0); // Timer state in seconds
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();
  const { setUser } = useUser();

  // for countdown
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    // Basic email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      errors.email = "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Password validation
    if (!password) {
      errors.password = "Password is required.";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await api.post("/auth/generate-otp", { email });
      setOtpSent(true);
      setTimer(120); // Start the timer (2 minutes = 120 seconds)
      setSuccessMessage(response.data.msg);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.msg || "Failed to send OTP. Please try again."
      );
      setSuccessMessage("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!otp) {
      setError("OTP is required.");
      return;
    }

    try {
      // Verify OTP
      const otpResponse = await api.post("/auth/verify-otp", { email, otp });

      // If OTP is valid, proceed with password login
      const passwordResponse = await api.post("/auth/login", {
        email,
        password,
      });

      // Save JWT token and user data
      localStorage.setItem("token", passwordResponse.data.token);
      localStorage.setItem("user", JSON.stringify({ email }));
      setUser({ email });

      setSuccessMessage("Login successful!");
      setError("");

      setTimeout(() => {
        const lastVisitedPage = localStorage.getItem("lastVisitedPage") || "/";
        localStorage.removeItem("lastVisitedPage"); // Clear last visited page after redirect
        navigate(lastVisitedPage);
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.msg ||
          "Invalid credentials or OTP. Please try again."
      );
      setSuccessMessage("");
    }
  };

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="p-4 shadow-lg" style={{ width: "400px" }}>
          <h3 className="text-center mb-3 fw-bold">Sign In</h3>
          <p className="text-center mb-4">
            Please Sign In to book an appointment
          </p>
          {error && <Alert variant="danger">{error}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}

          <Form onSubmit={otpSent ? handleLogin : handleSendOtp}>
            <Form.Group className="mb-3">
              <Form.Label className="text-dark">Email :</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                isInvalid={!!fieldErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-dark">Password :</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  isInvalid={!!fieldErrors.password}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <BsEyeSlash /> : <BsEye />}
                </Button>
                <Form.Control.Feedback type="invalid">
                  {fieldErrors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {otpSent && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label className="text-dark">OTP :</Form.Label>
                  <Form.Control
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    required
                  />
                </Form.Group>
                <p className="text-danger text-center">
                  Time remaining: {formatTime(timer)}
                </p>
              </>
            )}

            <Button variant="primary" type="submit" className="w-100 mb-3">
              {otpSent ? "Login" : "Send OTP"}
            </Button>
          </Form>

          <p className="text-center">
            Don't have an account? <Link to="/signUp">Register here</Link>
          </p>
          <p className="text-center">
            Are you a doctor? <Link to="/doctor-login">Sign in here</Link>
          </p>
        </Card>
      </Container>
    </>
  );
};

export default SignIn;
