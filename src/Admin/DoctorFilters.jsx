import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

export default function DoctorFilters({
  searchQuery,
  selectedHospital,
  selectedSpeciality,
  doctors,
  onSearchChange,
  onHospitalChange,
  onSpecialityChange,
  onClearFilters,
}) {
  const hospitals = [...new Set(doctors.map((doc) => doc.hospital))];
  const titles = [...new Set(doctors.map((doc) => doc.title))];

  return (
    <Row className="my-3">
      <Col md={4} className="my-2">
        <Form.Control
          type="text"
          placeholder="Search by doctor name"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{ border: "1px solid var(--secondary-color)" }}
        />
      </Col>
      <Col md={4} className="my-2">
        <Form.Select
          value={selectedHospital}
          onChange={(e) => onHospitalChange(e.target.value)}
          style={{ border: "1px solid var(--secondary-color)" }}
        >
          <option value="">All Hospitals</option>
          {hospitals.map((hospital, idx) => (
            <option key={idx} value={hospital}>
              {hospital}
            </option>
          ))}
        </Form.Select>
      </Col>
      <Col md={4} className="my-2">
        <Form.Select
          value={selectedSpeciality}
          onChange={(e) => onSpecialityChange(e.target.value)}
          style={{ border: "1px solid var(--secondary-color)" }}
        >
          <option value="">All Specialities</option>
          {titles.map((title, idx) => (
            <option key={idx} value={title}>
              {title}
            </option>
          ))}
        </Form.Select>
      </Col>
      <Col className="text-end mt-2">
        <Button variant="outline-secondary" onClick={onClearFilters}>
          Clear Filters
        </Button>
      </Col>
    </Row>
  );
}
