import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Form,
  Table,
  Modal,
  Badge,
  ListGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "react-scroll-to-top";
import { BeatLoader } from "react-spinners";
import api from "../axiosInterceptor";
import { useUser } from "../UserContext";

const Profile = () => {
  const { logout } = useUser();
  const navigate = useNavigate();
  const userEmail = JSON.parse(localStorage.getItem("user"))?.email || "";
  const [showModal, setShowModal] = useState(false);
  const [cancelType, setCancelType] = useState(null);
  const [cancelId, setCancelId] = useState(null);
  const [loading, setLoading] = useState(true); // Loader state
  const [queries, setQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [show, setShow] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: userEmail,
    mobile: "",
    gender: "",
    age: "",
    dateOfBirth: "",
  });

  const [appointments, setAppointments] = useState([]);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    if (userEmail) {
      api
        .get(`/queries`)
        .then((response) => {
          const userQueries = response.data.filter(
            (q) => q.email === userEmail
          );
          setQueries(userQueries);
        })
        .catch((error) => console.error("Error fetching user queries:", error));
      api
        .get(`/users/${userEmail}`)
        .then((response) => setUserData(response.data))
        .catch((error) => console.error("Error fetching user data:", error));

      api
        .get(`/appointments/${userEmail}`)
        .then((response) => setAppointments(response.data))
        .catch((error) => console.error("Error fetching appointments:", error));
      api
        .get(`/slots/${userEmail}`) //  Fetch slots
        .then((response) => setSlots(response.data))
        .catch((error) => console.error("Error fetching slots:", error))
        .finally(() => setLoading(false)); // Stop loading after all data is fetched
    }
  }, [userEmail]);

  const handleShowModal = (type, id) => {
    setCancelType(type);
    setCancelId(id);
    setShowModal(true);
  };

  const handleConfirmCancel = async () => {
    if (cancelType === "appointment") {
      await handleCancelAppointment(cancelId);
    } else if (cancelType === "slot") {
      await handleCancelSlot(cancelId);
    }
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => {
      if (name === "dateOfBirth") {
        return { ...prev, [name]: value, age: calculateAge(value) };
      }
      return { ...prev, [name]: value };
    });
  };

  // Calculate age based on date of birth
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleSave = async () => {
    try {
      const response = await api.put(`/users/update/${userEmail}`, userData);
      console.log("Update response:", response.data);
      const updatedResponse = await api.get(`/users/${userEmail}`);
      setUserData(updatedResponse.data);
      localStorage.setItem("userData", JSON.stringify(updatedResponse.data));
      toast.success("Your profile updated successfully!", {
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error updating user data:", error.response?.data || error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/signIn");
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const response = await api.delete(`/appointments/${appointmentId}`);
      console.log("Delete response:", response.data);
      setAppointments(
        appointments.filter((appointment) => appointment._id !== appointmentId)
      );
      toast.success("Appointment cancelled successfully!", {
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      console.error("Error details:", error.response?.data || error.message);
      toast.error("Failed to cancel appointment.", {
        autoClose: 3000,
      });
    }
  };
  const handleCancelSlot = async (slotId) => {
    try {
      const response = await api.delete(`/slots/${slotId}`);
      console.log("Delete response:", response.data);
      setSlots(slots.filter((slot) => slot._id !== slotId));
      toast.success("Slot cancelled successfully!", {
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error cancelling slot:", error);
      console.error("Error details:", error.response?.data || error.message);
      toast.error("Failed to cancel slot.", {
        autoClose: 3000,
      });
    }
  };
  const isPastAppointment = (appointmentDate, timeSlot) => {
    const appointmentDateTime = new Date(`${appointmentDate}T${timeSlot}`);
    return appointmentDateTime < new Date();
  };

  const mergedAppointments = [...appointments, ...slots].sort((a, b) => {
    const now = new Date(); // Get current date and time

    // Convert date and time into full Date objects
    const dateTimeA = new Date(`${a.appointmentDate}T${a.timeSlot}`);
    const dateTimeB = new Date(`${b.appointmentDate}T${b.timeSlot}`);

    const isCompletedA = dateTimeA < now; // Check if appointment is completed
    const isCompletedB = dateTimeB < now;

    // Sort by completed status (move completed to the bottom)
    if (isCompletedA !== isCompletedB) {
      return isCompletedA ? 1 : -1; // Completed moves to the bottom
    }

    // If both are upcoming or both completed, sort by date
    if (dateTimeA - dateTimeB !== 0) {
      return dateTimeA - dateTimeB; // Sort by nearest date first
    }

    // If same date, sort by time
    return a.timeSlot.localeCompare(b.timeSlot);
  });

  const handleShow = (query) => {
    setSelectedQuery(query);
    setShow(true);
  };

  return (
    <>
      <ToastContainer />
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <BeatLoader color="#6c63ff" />
        </div>
      ) : (
        <>
          <Container className="mt-5">
            <Row>
              <Col md={12} lg={4}>
                <Card className="shadow-lg text-center mb-3">
                  <Card.Body>
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center mx-auto"
                      style={{
                        width: "80px",
                        height: "80px",
                        backgroundColor: "#2196F3",
                        color: "white",
                        fontSize: "32px",
                        fontWeight: "bold",
                      }}
                    >
                      {userEmail.charAt(0).toUpperCase()}
                    </div>
                    <h4 className="mt-3">{userData.name || userEmail}</h4>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-dark">Name :</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={userData.name}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-dark">Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={userData.email}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-dark">Mobile</Form.Label>
                        <Form.Control
                          type="text"
                          name="mobile"
                          value={userData.mobile}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-dark">Gender</Form.Label>
                        <div className="d-flex justify-space-between gap-3">
                          <Form.Check
                            type="radio"
                            label="Male"
                            name="gender"
                            value="male"
                            checked={userData.gender === "male"}
                            onChange={handleInputChange}
                            className="text-dark"
                          />
                          <Form.Check
                            type="radio"
                            label="Female"
                            name="gender"
                            value="female"
                            checked={userData.gender === "female"}
                            onChange={handleInputChange}
                            className="text-dark"
                          />
                        </div>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-dark">
                          Date of Birth
                        </Form.Label>
                        <Form.Control
                          type="date"
                          name="dateOfBirth"
                          value={userData.dateOfBirth}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-dark">Age</Form.Label>
                        <Form.Control
                          type="text"
                          name="age"
                          value={
                            userData.dateOfBirth
                              ? calculateAge(userData.dateOfBirth)
                              : ""
                          }
                          readOnly
                        />
                      </Form.Group>
                    </Form>
                    <div className="d-flex justify-content-around mt-3">
                      <Button variant="success w-50 mx-1" onClick={handleSave}>
                        Save
                      </Button>
                      <Button variant="danger w-50" onClick={handleLogout}>
                        Logout
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              {/* Right Side: Appointments Table */}
              <Col md={12} lg={8}>
                <h3 className="dashboard-title mt-2 text-custom ">
                  Your Appointments & Slots
                </h3>

                <div className="d-none d-md-block">
                  <Table
                    responsive
                    striped
                    bordered
                    hover
                    className="custom-table"
                  >
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Time Slot</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Age</th>
                        <th>Hospital</th>
                        <th>Doctor</th>

                        {/* <th>Type</th> */}
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mergedAppointments.length > 0 ? (
                        mergedAppointments.map((item, index) => (
                          <tr key={index}>
                            <td>{item.appointmentDate}</td>
                            <td>{item.timeSlot}</td>
                            <td>{item.name}</td>
                            <td>{item.phone}</td>
                            <td>{item.age}</td>
                            <td>{item.hospital}</td>
                            <td>{item.doctor?.name || "N/A"}</td>
                            {/* <td>
                            {appointments.includes(item)
                              ? "Appointment"
                              : "Slot"}
                          </td> */}
                            <td>
                              {isPastAppointment(
                                item.appointmentDate,
                                item.timeSlot
                              ) ? (
                                <Button className="btn-success" disabled>
                                  Completed
                                </Button>
                              ) : (
                                <Button
                                  variant="danger"
                                  onClick={() =>
                                    handleShowModal(
                                      appointments.includes(item)
                                        ? "appointment"
                                        : "slot",
                                      item._id
                                    )
                                  }
                                >
                                  Cancel
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="text-center">
                            No appointments or slots found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>

                {/* Mini cards for small screens */}
                <div className="d-md-none">
                  {mergedAppointments.length > 0 ? (
                    mergedAppointments.map((item, index) => (
                      <Card key={index} className="appointment-card mb-3">
                        <Card.Body>
                          <h5 className="appointment-name">{item.name}</h5>
                          <p>
                            <strong>Mobile:</strong> {item.phone}
                          </p>
                          <p>
                            <strong>Date:</strong> {item.appointmentDate}
                          </p>
                          <p>
                            <strong>Hospital:</strong> {item.hospital}
                          </p>
                          <p>
                            <strong>Doctor:</strong>{" "}
                            {item.doctor?.name || "N/A"}
                          </p>
                          <p>
                            <strong>Time Slot:</strong> {item.timeSlot}
                          </p>
                          <p>
                            <strong>Age:</strong> {item.age}
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
                            onClick={() =>
                              !isPastAppointment(
                                item.appointmentDate,
                                item.timeSlot
                              ) && handleShowModal("appointment", item._id)
                            }
                          >
                            {isPastAppointment(
                              item.appointmentDate,
                              item.timeSlot
                            )
                              ? "Completed"
                              : "Cancel"}
                          </Button>
                        </Card.Body>
                      </Card>
                    ))
                  ) : (
                    <p className="text-center no-appointments">
                      No appointments or slots found.
                    </p>
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Cancellation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel this {cancelType}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleConfirmCancel}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <Container className="mt-4">
        <h3 className="text-center mb-4">Your Queries</h3>
        <ListGroup>
          {queries.map((query) => (
            <ListGroup.Item
              key={query._id}
              action
              onClick={() => handleShow(query)}
            >
              {query.query}
              <Badge
                bg={query.adminResponse ? "success" : "warning"}
                className="ms-2"
              >
                {query.adminResponse ? "Responded" : "Pending"}
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>

        {/* Modal for displaying query details */}
        <Modal show={show} onHide={() => setShow(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Query Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedQuery && (
              <>
                <p>
                  <strong>Query:</strong> {selectedQuery.query}
                </p>
                <p>
                  <strong>Admin Response:</strong>{" "}
                  {selectedQuery.adminResponse ? (
                    <Badge bg="success">{selectedQuery.adminResponse}</Badge>
                  ) : (
                    <Badge bg="warning text-dark">Pending</Badge>
                  )}
                </p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <ScrollToTop smooth color="#028885" />
    </>
  );
};

export default Profile;
