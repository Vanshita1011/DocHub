import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faSearch } from "@fortawesome/free-solid-svg-icons";
import { InputGroup, Form, Col, Row, Container } from "react-bootstrap";
import symptomToSpecialty from "./Symptoms";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  selectedHospital,
  setSelectedHospital,
  selectedSymptom,
  selectedSpeciality,
  setSelectedSpeciality,
  setSelectedSymptom,
  filteredHospitals,
  specialities,
}) => {
  return (
    <div className="search-bar">
      <Container>
        <h2 className="text-center fw-bold p-4">Search For Best Doctors</h2>

        <Row>
          <Col lg={3} sm={12} className="p-2">
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} fade />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search by : Doctors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col lg={3} sm={12} className="p-2">
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faLocationDot} fade />
              </InputGroup.Text>
              <Form.Select
                value={selectedHospital}
                onChange={(e) => setSelectedHospital(e.target.value)}
              >
                <option value="">Select Hospital</option>
                {filteredHospitals.map((hospital, index) => (
                  <option key={index} value={hospital}>
                    {hospital}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
          </Col>
          <Col lg={3} sm={12} className="p-2">
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} fade />
              </InputGroup.Text>
              <Form.Select
                value={selectedSymptom}
                onChange={(e) => setSelectedSymptom(e.target.value)}
              >
                <option value="">Select Symptom</option>
                {Object.keys(symptomToSpecialty).map((symptom, index) => (
                  <option key={index} value={symptom}>
                    {symptom}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
          </Col>
          <Col lg={3} sm={12} className="p-2">
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} fade />
              </InputGroup.Text>
              <Form.Select
                value={selectedSpeciality}
                onChange={(e) => setSelectedSpeciality(e.target.value)}
              >
                <option value="">Select Speciality</option>
                {specialities.map((speciality, index) => (
                  <option key={index} value={speciality}>
                    {speciality}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchBar;
