import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

export default function DoctorFormModal({
  show,
  onHide,
  onSubmit,
  formData,
  setFormData,
  editingId,
}) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{editingId ? "Edit Doctor" : "Add Doctor"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit} className="book-form">
          {[
            "name",
            "title",
            "hospital",
            "experience",
            "fee",
            "email",
            "password",
          ].map((field, i) => (
            <Form.Group className="mb-3" key={i}>
              <Form.Label>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Form.Label>
              <Form.Control
                type={field === "password" ? "password" : "text"}
                value={formData[field]}
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
                required={!(editingId && field === "password")}
              />
            </Form.Group>
          ))}
          <Form.Group className="mb-3">
            <Form.Label>About</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.about}
              onChange={(e) =>
                setFormData({ ...formData, about: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, img: e.target.files[0] })
              }
              required={!editingId}
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            {editingId ? "Update" : "Add"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
