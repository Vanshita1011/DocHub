import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../axiosInterceptor";
import Sidebar from "../Component/Sidebar";

export default function AddDoctor() {
  const [formData, setFormData] = useState({
    img: "",
    name: "",
    title: "",
    hospital: "",
    experience: "",
    fee: "",
    about: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, img: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      await api.post("/doctors/addDoctor", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Doctor added successfully!");
      setTimeout(() => {
        navigate("/admin-dashboard"); // Redirect back to the dashboard after 2 seconds
      }, 2000);
    } catch (error) {
      toast.error("Error adding doctor");
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <Container
        className="mt-5 p-3 "
        style={{
          width: "80%",
          background: "linear-gradient(to bottom, #028885, #007c9d) ",
          borderRadius: "10px",
        }}
      >
        <ToastContainer position="top-right" autoClose={3000} />
        <Row>
          <Col>
            <h2 className="text-light d-flex justify-content-center">
              Add Doctor
            </h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Hospital</Form.Label>
                <Form.Control
                  type="text"
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Experience</Form.Label>
                <Form.Control
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Fee</Form.Label>
                <Form.Control
                  type="number"
                  name="fee"
                  value={formData.fee}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>About</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Add Doctor
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
