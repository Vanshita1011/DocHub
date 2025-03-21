import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Container, Card } from "react-bootstrap";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import api from "../axiosInterceptor";
import { useUser } from "../UserContext";

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/admin/login", formData);
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("admin", JSON.stringify({ email: formData.email }));
      // Update the context immediately
      setUser({ email: formData.email });

      navigate("/admin-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="p-4 shadow-lg login-card">
          <h3 className="text-center mb-3 fw-bold">Admin Login</h3>
          <p className="text-center mb-4">Sign in to access the Admin Panel</p>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="text-dark">Email :</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-dark">Password :</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <BsEyeSlash /> : <BsEye />}
                </Button>
              </div>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Card>
      </Container>
    </>
  );
}
