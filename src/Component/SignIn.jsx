import React, { useState } from "react";
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
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

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
  const { setUser } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", response.data.token); // Save JWT token
      localStorage.setItem("user", JSON.stringify({ email })); // Store user data
      // Update the context immediately
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
        err.response?.data?.msg || "Invalid credentials. Please try again."
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
          <Form onSubmit={handleLogin}>
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

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Login
            </Button>
            <p className="text-center">
              Don't have an account? <Link to="/signUp">Register here</Link>
            </p>
            <p className="text-center">
              Are you a doctor? <Link to="/doctor-login">Sign in here</Link>
            </p>
          </Form>
        </Card>
      </Container>
    </>
  );
};

export default SignIn;
