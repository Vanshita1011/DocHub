import React, { useState } from "react";
import axios from "axios";
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
import Header from "../common/Header";
import Footer from "../common/footer";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
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

    // Date of Birth validation
    if (!dateOfBirth) {
      errors.dateOfBirth = "Date of Birth is required.";
      isValid = false;
    }

    // Mobile number validation
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobile) {
      errors.mobile = "Mobile number is required.";
      isValid = false;
    } else if (!mobileRegex.test(mobile)) {
      errors.mobile = "Please enter a valid 10-digit mobile number.";
      isValid = false;
    }

    // Gender validation
    if (!gender) {
      errors.gender = "Gender is required.";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
        age,
        mobile,
        gender,
        dateOfBirth,
      });
      setSuccessMessage("Registration successful!");
      setError("");

      setEmail("");
      setPassword("");
      setDateOfBirth("");
      setAge("");
      setMobile("");
      setGender("");
      setTimeout(() => navigate("/signIn"), 2000);
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
      setSuccessMessage("");
    }
  };

  const handleDateOfBirthChange = (e) => {
    const dob = e.target.value;
    setDateOfBirth(dob);
    setAge(calculateAge(dob));
  };

  return (
    <>
      <Header />
      <Container className="d-flex justify-content-center align-items-center my-5 min-vh-100">
        <Card className="p-4 shadow-lg " style={{ width: "400px" }}>
          <h3 className="text-center mb-3 fw-bold">Create Account</h3>
          <p className="text-center mb-4">Please sign up to book appointment</p>
          {error && <Alert variant="danger">{error}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          <Form onSubmit={handleRegister}>
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
                >
                  {showPassword ? <BsEyeSlash /> : <BsEye />}
                </Button>
                <Form.Control.Feedback type="invalid">
                  {fieldErrors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-dark">Date of Birth :</Form.Label>
              <Form.Control
                type="date"
                value={dateOfBirth}
                onChange={handleDateOfBirthChange}
                isInvalid={!!fieldErrors.dateOfBirth}
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.dateOfBirth}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-dark">Age :</Form.Label>
              <Form.Control
                type="number"
                value={age}
                readOnly
                placeholder="Age"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-dark">Mobile Number :</Form.Label>
              <Form.Control
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Mobile Number"
                isInvalid={!!fieldErrors.mobile}
              />
              <Form.Control.Feedback type="invalid">
                {fieldErrors.mobile}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-dark">Gender :</Form.Label>
              <div className="d-flex justify-space-between gap-3">
                <Form.Check
                  type="radio"
                  label="Male"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                  isInvalid={!!fieldErrors.gender}
                />
                <Form.Check
                  type="radio"
                  label="Female"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                  isInvalid={!!fieldErrors.gender}
                />
              </div>
              <Form.Control.Feedback type="invalid">
                {fieldErrors.gender}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mb-3">
              Create account
            </Button>
            <p className="text-center">
              Already have an account? <Link to="/signIn">Login here</Link>
            </p>
          </Form>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default Register;
