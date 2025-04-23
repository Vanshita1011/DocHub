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
  const [errors, setErrors] = useState({}); // For validation errors
  const [showAlert, setShowAlert] = useState(false); // For displaying alert message
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
    window.addEventListener("storage", fetchUser); // Listen for storage updates

    return () => {
      window.removeEventListener("storage", fetchUser);
    };
  }, []);

  // Generate time slots from 8 AM to 8 PM with 30 minutes interval
  const generateTimeSlots = (selectedDate) => {
    const slots = [];
    const now = new Date();
    const today = now.toISOString().split("T")[0];

    for (let hour = 9; hour <= 20; hour++) {
      const slotTime = new Date(selectedDate);
      slotTime.setHours(hour, 0, 0, 0);
      if (selectedDate !== today || slotTime > now) {
        slots.push(`${hour}:00`);
      }

      if (hour !== 20) {
        const slotTimeHalf = new Date(selectedDate);
        slotTimeHalf.setHours(hour, 30, 0, 0);
        if (selectedDate !== today || slotTimeHalf > now) {
          slots.push(`${hour}:30`);
        }
      }
    }
    return slots;
  };

  // Generate date slots for the next 10 days
  const generateDateSlots = () => {
    const slots = [];
    const today = new Date();
    for (let i = 0; i < 10; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      slots.push(date.toISOString().split("T")[0]); // Format date as YYYY-MM-DD
    }
    return slots;
  };

  const days = generateDateSlots();
  const times = generateTimeSlots(selectedDay);

  // Function to handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to validate form
  // const validateForm = () => {
  //   let newErrors = {};
  //   const nameRegex = /^[A-Za-z\s]+$/;
  //   const mobileRegex = /^[0-9]{10}$/;
  //   const ageRegex = /^[1-9][0-9]?$|^120$/; // Age between 1 and 120

  //   if (!nameRegex.test(formData.name)) {
  //     newErrors.name = "Name should contain only alphabets";
  //   }

  //   if (!mobileRegex.test(formData.phone)) {
  //     newErrors.phone = "Mobile Number should be exactly 10 digits";
  //   }

  //   if (!ageRegex.test(formData.age)) {
  //     newErrors.age = "Age should be a valid number between 1 and 120";
  //   }
  //   if (!formData.gender) {
  //     newErrors.gender = "gender is required.";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0; // Returns true if no errors
  // };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const response = await api.post("/slots/book-slot", {
        ...formData,
        doctorName: formData.doctor, //  Send doctor name, backend will convert to ObjectId
      });

      if (response.status === 201) {
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

  // Handle book button click
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

        {/* Book Button */}
        {/* Alert Message */}
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
        {/* Book Button */}
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
            filteredHospitals={[doctor.hospital]} // Filtered hospitals can be passed here
            filteredDoctors={[doctor]} // Filtered doctors can be passed here
          />
        </Modal.Body>
      </Modal>
      {/* Success Modal */}
      <SuccessModal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        message3="Please check the email for confirmation details"
      />
    </>
  );
};

export default Slot;
