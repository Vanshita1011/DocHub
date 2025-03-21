import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Bookapp.css";
import DoctorCard from "./DoctorCard";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faSearch } from "@fortawesome/free-solid-svg-icons";
import ScrollToTop from "react-scroll-to-top";
import { toast } from "react-toastify";
import symptomToSpecialty from "./Symptoms";
import { BeatLoader } from "react-spinners";
import DownloadSection from "./DownloadSection";
import { validateForm } from "./formUtils";
import api from "../../axiosInterceptor";
import AppointmentForm from "./AppointmentForm";
import SuccessModal from "./SuccessModal";

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
                </b>
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
                    <AppointmentForm
                      formData={formData}
                      errors={errors}
                      handleInputChange={handleInputChange}
                      handleSubmit={handleSubmit}
                      filteredHospitals={filteredHospitals}
                      filteredDoctors={filteredDoctors}
                    />
                    <SuccessModal
                      show={showSuccessModal}
                      onHide={() => setShowSuccessModal(false)}
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </>
      )}
      {/* Success Modal */}

      <DownloadSection />
      <ScrollToTop smooth color="#028885" />
    </>
  );
}
