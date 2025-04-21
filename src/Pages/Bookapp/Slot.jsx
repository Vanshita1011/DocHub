// Slot.jsx (Full File with Availability Integration)
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./slot.css";
import { Col, Container, Row, Alert, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import api from "../../axiosInterceptor";
import SuccessModal from "./SuccessModal";
import AppointmentForm from "./AppointmentForm";
import { validateForm } from "./formUtils";

const Slot = ({ doctor }) => {
  const userEmail = JSON.parse(localStorage.getItem("user"))?.email || "";

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showFormModal, setShowFormModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [availableSlots, setAvailableSlots] = useState({});
  const [formData, setFormData] = useState({
    userEmail: userEmail,
    name: "",
    phone: "",
    age: "",
    appointmentDate: "",
    timeSlot: "",
    hospital: doctor.hospital,
    doctor: doctor.name,
    gender: "",
  });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = () => {
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        setUser(JSON.parse(loggedInUser));
      } else {
        setUser(null);
      }
    };

    fetchUser();
    window.addEventListener("storage", fetchUser);

    return () => {
      window.removeEventListener("storage", fetchUser);
    };
  }, []);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await api.get(`/availability/doctor/${doctor._id}`);
        const grouped = {};
        (response.data || []).forEach((slot) => {
          if (!slot.isBooked) {
            grouped[slot.appointmentDate] = grouped[slot.appointmentDate] || [];
            grouped[slot.appointmentDate].push(slot.timeSlot);
          }
        });
        setAvailableSlots(grouped);
      } catch (err) {
        console.error("Error loading availability", err);
      }
    };
    if (doctor?._id) fetchAvailability();
  }, [doctor]);

  const days = Object.keys(availableSlots);
  const times = selectedDay ? availableSlots[selectedDay] : [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const response = await api.post("/availability/book", {
        appointmentDate: selectedDay,
        timeSlot: selectedTime,
      });

      if (response.status === 200) {
        setShowFormModal(false);
        setShowSuccessModal(true);
        setFormData({
          name: "",
          phone: "",
          age: "",
          appointmentDate: "",
          timeSlot: "",
          hospital: "",
          doctor: "",
          gender: "",
        });
        setErrors({});
        toast.success("Slot booked successfully!");
      }
    } catch (error) {
      console.error(
        "Error booking slot:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Failed to book slot.");
    }
  };

  const handleBookClick = () => {
    if (!user) {
      navigate("/signIn");
      return;
    }
    if (!selectedDay || !selectedTime) {
      setShowAlert(true);
      return;
    }
    setFormData((prev) => ({
      ...prev,
      appointmentDate: selectedDay,
      timeSlot: selectedTime,
    }));
    setShowFormModal(true);
  };

  return (
    <>
      <Container className="text-center my-4">
        <h5 className="text-start text-custom">Booking slots</h5>

        {/* Days Selection */}
        <Row className="mt-3 justify-content-start">
          {days.map((date, index) => (
            <Col key={index} sm={2} md={2} xs={3} className="mb-2">
              <button
                className={`day-btn rounded-5 d-flex flex-column align-items-center p-2 w-100 ${
                  selectedDay === date ? "selected" : ""
                }`}
                onClick={() => setSelectedDay(date)}
              >
                <span className="date-text">{date}</span>
              </button>
            </Col>
          ))}
        </Row>
        <h5 className="text-start text-custom">Time slots</h5>

        {/* Time Selection */}
        <Row className="mt-3 justify-content-start">
          {times.map((time, index) => (
            <Col key={index} lg={2} sm={4} md={3} xs={4} className="mb-2">
              <button
                className={`time-btn w-100 p-2 ${
                  selectedTime === time ? "selected" : ""
                }`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            </Col>
          ))}
        </Row>

        {showAlert && (
          <Alert
            variant="danger"
            onClose={() => setShowAlert(false)}
            dismissible
            className="mt-3"
          >
            Please select both a date and time slot to book an appointment.
          </Alert>
        )}

        <div className="mt-4">
          <button className="book-btn px-4 py-2" onClick={handleBookClick}>
            Book an appointment
          </button>
        </div>
      </Container>

      {/* Modal for Appointment Form */}
      <Modal show={showFormModal} onHide={() => setShowFormModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Book an Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AppointmentForm
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            filteredHospitals={[doctor.hospital]}
            filteredDoctors={[doctor]}
          />
        </Modal.Body>
      </Modal>

      <SuccessModal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
      />
    </>
  );
};

export default Slot;
