import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Bookapp.css";
import DoctorCard from "./DoctorCard";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faSearch } from "@fortawesome/free-solid-svg-icons";
import ScrollToTop from "react-scroll-to-top";
import { toast } from "react-toastify";
import symptomToSpecialty from "./Symptoms";
import { BeatLoader } from "react-spinners";
import DownloadSection from "./DownloadSection";
import {
  generateTimeSlots,
  generateUpcomingDates,
  validateForm,
} from "./formUtils";
import api from "../../axiosInterceptor";

export default function Bookapp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState({}); // Validation errors
  const userEmail = JSON.parse(localStorage.getItem("user"))?.email || "";
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    appointmentDate: "",
    hospital: "",
    doctor: "",
    age: "",
    timeSlot: "",
    gender: "",
  });
  const [selectedHospital, setSelectedHospital] = useState(""); // State for selected hospital
  const [selectedDoctor, setSelectedDoctor] = useState(""); // State for selected doctor
  const [selectedSymptom, setSelectedSymptom] = useState(""); // State for selected symptom
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [doctorsData, setDoctorsData] = useState([]); // State to store fetched doctor data
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch doctor data from the API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get("/doctors/getDoctors");
        setDoctorsData(response.data);
        setFilteredDoctors(response.data);
        setFilteredHospitals([
          ...new Set(response.data.map((doctor) => doctor.hospital)),
        ]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // Filter doctors based on search query, hospital, and symptom
  const filteredDoctorCards = doctorsData.filter((doctor) => {
    const matchesName = doctor.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesHospital =
      selectedHospital === "" || doctor.hospital === selectedHospital;
    const matchesSymptom =
      selectedSymptom === "" ||
      doctor.title === symptomToSpecialty[selectedSymptom];
    return matchesName && matchesHospital && matchesSymptom;
  });

  useEffect(() => {
    if (selectedHospital) {
      setFilteredDoctors(
        doctorsData.filter((doctor) => doctor.hospital === selectedHospital)
      );
    } else {
      setFilteredDoctors(doctorsData);
    }
  }, [selectedHospital, doctorsData]);

  useEffect(() => {
    if (selectedDoctor) {
      const doctor = doctorsData.find((doc) => doc.name === selectedDoctor);
      if (doctor) {
        setFilteredHospitals([doctor.hospital]);
      }
    } else {
      setFilteredHospitals([
        ...new Set(doctorsData.map((doctor) => doctor.hospital)),
      ]);
    }
  }, [selectedDoctor, doctorsData]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "hospital") {
      setSelectedHospital(value);
      setSelectedDoctor("");
    }
    if (name === "doctor") {
      setSelectedDoctor(value);
      setSelectedHospital("");
    }
    if (name === "doctor" && value) {
      setFilteredDoctors(doctorsData.filter((doctor) => doctor.name === value));
    } else if (name === "hospital" && value) {
      setFilteredDoctors(
        doctorsData.filter((doctor) => doctor.hospital === value)
      );
    } else {
      setFilteredDoctors(doctorsData);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userEmail) {
      toast.warning("Please sign in to book an appointment.", {
        autoClose: 3000,
      });
      navigate("/signIn");
      return;
    }

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        console.log("Form Data:", formData); // Log form data
        await api.post("/appointments", {
          userEmail,
          ...formData,
        });
        setShowSuccessModal(true);
        setFormData({
          name: "",
          phone: "",
          appointmentDate: "",
          hospital: "",
          doctor: "",
          age: "",
          timeSlot: "",
          gender: "",
        });
        setErrors({});
      } catch (error) {
        console.error("Error booking appointment:", error);
      }
    } else {
      console.log("Validation Errors:", errors); // Log validation errors
    }
  };

  return (
    <>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <BeatLoader color="#6c63ff" />
        </div>
      ) : (
        <>
          <div className="search-bar">
            <Container>
              <h2 className="text-center fw-bold p-4">
                Search For Best Doctors
              </h2>
              <Row>
                <Col lg={4} sm={12} className="p-2">
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
                <Col lg={4} sm={12} className="p-2">
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
                <Col lg={4} sm={12} className="p-2">
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
              </Row>
            </Container>
          </div>

          <div className="doctorcards p-5">
            <div className="abtheading text-center fw-bold">
              <h1
                className="p-2"
                style={{ color: "#028885", fontSize: "50px" }}
              >
                Team of Experts
              </h1>
              <h4 className="p-2 " style={{ color: " #007c9d" }}>
                Meet the experts behind{" "}
                <b>
                  <i>DocHub's</i>
                </b>{" "}
                healthcare technology advancements
              </h4>
            </div>
            <Container>
              <Row>
                {filteredDoctorCards.length > 0 ? (
                  filteredDoctorCards.map((doctor, i) => (
                    <DoctorCard dItems={doctor} key={i} />
                  ))
                ) : (
                  <h3 className="text-center p-4">No doctors found</h3>
                )}
              </Row>
            </Container>
          </div>
          <div className="bookapp">
            <Container>
              <Row>
                <Col
                  lg={6}
                  md={12}
                  sm={12}
                  className="mb-4 d-flex justify-content-center"
                >
                  <img
                    src="images/appoint_bg_doc.png"
                    alt="Medical Appointment"
                    className="img-fluid"
                    style={{ maxHeight: "min-content" }}
                  />
                </Col>
                <Col lg={6} md={12} sm={12} className="p-4">
                  <div className="form">
                    <h2 className="text-center p-4 fw-bold">
                      Book an Appointment
                    </h2>
                    <form
                      className="p-3 rounded book-form"
                      onSubmit={handleSubmit}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your name"
                        />
                        {errors.name && (
                          <p className="text-danger bg-warning p-1 rounded">
                            {errors.name}
                          </p>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                        />
                        {errors.phone && (
                          <p className="text-danger bg-warning p-1 rounded">
                            {errors.phone}
                          </p>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleInputChange}
                          placeholder="Enter your age"
                        />
                        {errors.age && (
                          <p className="text-danger bg-warning p-1 rounded">
                            {errors.age}
                          </p>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <div className="text-white d-flex gap-3">
                          <Form.Check
                            type="radio"
                            label="Male"
                            name="gender"
                            value="male"
                            checked={formData.gender === "male"}
                            onChange={handleInputChange}
                          />
                          <Form.Check
                            type="radio"
                            label="Female"
                            name="gender"
                            value="female"
                            checked={formData.gender === "female"}
                            onChange={handleInputChange}
                          />
                        </div>
                        {errors.gender && (
                          <p className="text-danger bg-warning p-1 rounded">
                            {errors.gender}
                          </p>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Appointment Date</Form.Label>
                        <Form.Control
                          as="select"
                          name="appointmentDate"
                          value={formData.appointmentDate}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Appointment Date</option>
                          {generateUpcomingDates().map((date, index) => (
                            <option key={index} value={date}>
                              {date}
                            </option>
                          ))}
                        </Form.Control>
                        {errors.appointmentDate && (
                          <p className="text-danger bg-warning p-1 rounded">
                            {errors.appointmentDate}
                          </p>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Time Slot</Form.Label>
                        <Form.Control
                          as="select"
                          name="timeSlot"
                          value={formData.timeSlot}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Time Slot</option>
                          {generateTimeSlots(formData.appointmentDate).map(
                            (slot, index) => (
                              <option key={index} value={slot}>
                                {slot}
                              </option>
                            )
                          )}
                        </Form.Control>
                        {errors.timeSlot && (
                          <p className="text-danger bg-warning p-1 rounded">
                            {errors.timeSlot}
                          </p>
                        )}
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Hospital</Form.Label>
                        <Form.Control
                          as="select"
                          name="hospital"
                          value={formData.hospital}
                          onChange={handleInputChange}
                        >
                          <option value="">Choose preferred Hospitals:</option>
                          {filteredHospitals.map((hospital, index) => (
                            <option key={index} value={hospital}>
                              {hospital}
                            </option>
                          ))}
                        </Form.Control>
                        {errors.hospital && (
                          <p className="text-danger bg-warning p-1 rounded">
                            {errors.hospital}
                          </p>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Doctor</Form.Label>
                        <Form.Control
                          as="select"
                          name="doctor"
                          value={formData.doctor}
                          onChange={handleInputChange}
                        >
                          <option value="">
                            Choose preferred Doctor (if any):
                          </option>
                          {filteredDoctors.map((doctor, index) => (
                            <option key={index} value={doctor._id}>
                              {doctor.name}
                            </option>
                          ))}
                        </Form.Control>
                        {errors.doctor && (
                          <p className="text-danger bg-warning p-1 rounded">
                            {errors.doctor}
                          </p>
                        )}
                      </Form.Group>

                      <button type="submit" className="bkbtn">
                        Book Appointment
                      </button>
                    </form>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </>
      )}
      {/* Success Modal */}
      <Modal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ position: "relative" }}>Success</Modal.Title>
          <img
            src="\images\tick.png"
            alt=""
            style={{
              width: "90px",
              position: "absolute",
              justifySelf: "anchor-center",
              display: "flex",
              top: "-40px",
            }}
          />
        </Modal.Header>
        <Modal.Body>
          <p>Your appointment is successfully booked!</p>
          <br />
          <p>Thank You for booking an appointment!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowSuccessModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      <DownloadSection />
      <ScrollToTop smooth color="#028885" />
    </>
  );
}
