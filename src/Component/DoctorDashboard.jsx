import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
} from "react-bootstrap";
import "./DoctorDashboard.css";
import { BeatLoader } from "react-spinners";
import api from "../axiosInterceptor";
import { useUser } from "../UserContext";
import DoctorCalendar from "./DoctorCalendar";

export default function DoctorDashboard() {
  const { logout } = useUser();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [slots, setSlots] = useState([]);
  const [doctorName, setDoctorName] = useState("");
  const [loading, setLoading] = useState(true);
  const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    title: "",
    hospital: "",
    img: "",
  });

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      setLoading(true);
      const doctorEmail =
        JSON.parse(localStorage.getItem("doctor"))?.email || "";
      if (!doctorEmail) {
        alert("Please login first");
        navigate("/doctor-login");
        return;
      }

      try {
        const response = await api.get(`/doctors/email/${doctorEmail}`);
        if (response.data) {
          setDoctorName(response.data.name);
          setDoctor({
            name: response.data.name,
            email: response.data.email,
            title: response.data.title,
            hospital: response.data.hospital,
            img: response.data.img,
          });
        }
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAppointments = async () => {
      setLoading(true);
      const doctorId = localStorage.getItem("doctorId");
      if (!doctorId) {
        alert("Please login first");
        navigate("/doctor-login");
        return;
      }

      try {
        const response = await api.get(`/appointments/doctor/${doctorId}`);
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSlots = async () => {
      setLoading(true);
      const doctorId = localStorage.getItem("doctorId");
      if (!doctorId) {
        alert("Please login first");
        navigate("/doctor-login");
        return;
      }

      try {
        const response = await api.get(`/slots/doctor/${doctorId}`);
        setSlots(response.data);
      } catch (error) {
        console.error("Error fetching slots:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
    fetchAppointments();
    fetchSlots();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    // localStorage.removeItem("doctor");
    // localStorage.removeItem("doctorId");
    // localStorage.removeItem("token");
    navigate("/doctor-login");
  };
  const isPastAppointment = (appointmentDate, timeSlot) => {
    const appointmentDateTime = new Date(`${appointmentDate}T${timeSlot}`);
    return appointmentDateTime < new Date();
  };
  const mergedData = [...appointments, ...slots].sort((a, b) => {
    // Convert date strings to Date objects for accurate comparison
    const dateA = new Date(a.appointmentDate);
    const dateB = new Date(b.appointmentDate);

    // If dates are different, sort by date (earliest first)
    if (dateA - dateB !== 0) {
      return dateA - dateB;
    }

    // If dates are the same, sort by time (earliest first)
    const timeA = a.timeSlot.includes(":") ? a.timeSlot : `00:${a.timeSlot}`;
    const timeB = b.timeSlot.includes(":") ? b.timeSlot : `00:${b.timeSlot}`;

    return new Date(`1970-01-01T${timeA}`) - new Date(`1970-01-01T${timeB}`);
  });
  return (
    <>
      {loading ? (
        <div
          className="d-flex justify-content-center  align-items-center"
          style={{ height: "80vh" }}
        >
          <BeatLoader color="#6c63ff" />
        </div>
      ) : (
        <>
          <Container className="dashboard-container">
            <h4 className="text-custom">
              <strong>Doctor Dashboard</strong>
            </h4>
            <Row>
              {/* Left Side: Doctor Profile */}
              <Col md={12} lg={4}>
                <Card className="profile-card">
                  <Card.Body className="text-center">
                    {/* Profile Picture (First Letter) */}
                    <div className="text-center profile-img-container">
                      {doctor.img ? (
                        <img
                          src={doctor.img}
                          alt="Doctor"
                          className="rounded-circle mx-auto d-block profile-img"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center mx-auto"
                          style={{
                            width: "80px",
                            height: "80px",
                            backgroundColor: "#007bff",
                            color: "white",
                            fontSize: "32px",
                            fontWeight: "bold",
                          }}
                        >
                          {doctor.name.charAt(4).toUpperCase()}
                        </div>
                      )}
                    </div>

                    <h4 className="mt-3">{doctor.name}</h4>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-dark">Title</Form.Label>
                        <Form.Control
                          type="text"
                          value={doctor.title}
                          readOnly
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-dark">Hospital</Form.Label>
                        <Form.Control
                          type="text"
                          value={doctor.hospital}
                          readOnly
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-dark">Email</Form.Label>
                        <Form.Control
                          type="email"
                          value={doctor.email}
                          readOnly
                        />
                      </Form.Group>
                    </Form>
                    <Button
                      className="docbtn"
                      variant="danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </Card.Body>
                </Card>
              </Col>

              {/* Right Side: Appointments Table */}
              <Col md={12} lg={8}>
                <h2 className="dashboard-title mt-2 text-custom">
                  *{doctorName}'s Appointments
                </h2>
                <div className="d-none d-md-block">
                  <Table
                    striped
                    bordered
                    hover
                    responsive
                    className="custom-table"
                  >
                    <thead>
                      <tr>
                        <th>Patient Name</th>
                        <th>Mobile</th>
                        <th>Date</th>
                        <th>Time Slot</th>
                        <th>Age</th>
                        <th>Gender</th>
                        {/* <th>Type</th> */}
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {mergedData.length > 0 ? (
                        mergedData.map((item) => (
                          <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.phone}</td>
                            <td>{item.appointmentDate}</td>
                            <td>{item.timeSlot}</td>
                            <td>{item.age}</td>
                            <td>{item.gender}</td>
                            {/* <td>
                      {appointments.some(
                        (appointment) => appointment._id === item._id
                      )
                        ? "Appointment"
                        : "Slot"}
                    </td> */}
                            <td>
                              {isPastAppointment(
                                item.appointmentDate,
                                item.timeSlot
                              ) ? (
                                <Button variant="secondary" disabled>
                                  Completed
                                </Button>
                              ) : (
                                <Button variant="danger">Upcoming</Button>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="9"
                            className="text-center no-appointments"
                          >
                            No appointments or slots found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>

                {/* Mini cards for small screens */}
                <div className="d-md-none">
                  {mergedData.length > 0 ? (
                    mergedData.map((item) => (
                      <Card key={item._id} className="appointment-card">
                        <Card.Body>
                          <h5 className="appointment-name">{item.name}</h5>
                          <p>
                            <strong>Mobile:</strong> {item.phone}
                          </p>
                          <p>
                            <strong>Date:</strong> {item.appointmentDate}
                          </p>
                          <p>
                            <strong>Time Slot:</strong> {item.timeSlot}
                          </p>
                          <p>
                            <strong>Age:</strong> {item.age}
                          </p>
                          <p>
                            <strong>Gender:</strong> {item.gender}
                          </p>
                          <Button
                            variant={
                              isPastAppointment(
                                item.appointmentDate,
                                item.timeSlot
                              )
                                ? "secondary"
                                : "danger"
                            }
                            disabled={isPastAppointment(
                              item.appointmentDate,
                              item.timeSlot
                            )}
                          >
                            {isPastAppointment(
                              item.appointmentDate,
                              item.timeSlot
                            )
                              ? "Completed"
                              : "Upcoming"}
                          </Button>
                        </Card.Body>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <p className="no-appointments">No appointments found</p>
                    </Card>
                  )}
                </div>
              </Col>
            </Row>
            <DoctorCalendar />
          </Container>
        </>
      )}
    </>
  );
}
