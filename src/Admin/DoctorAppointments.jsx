import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  Container,
  Row,
  Col,
  Button,
  Card,
  Badge,
} from "react-bootstrap";
import { BeatLoader } from "react-spinners";
import api from "../axiosInterceptor";

export default function DoctorAppointments() {
  const { doctorId } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [slots, setSlots] = useState([]);
  const [doctorName, setDoctorName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await api.get(`/doctors/${doctorId}`);
        setDoctorName(response.data.name);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/appointments/doctor/${doctorId}`);
        const updatedAppointments = response.data.map((appointment) => {
          const appointmentDateTime = new Date(
            `${appointment.appointmentDate}T${appointment.timeSlot}`
          );
          if (appointmentDateTime < new Date()) {
            appointment.status = "Completed";
          }
          return appointment;
        });
        setAppointments(updatedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSlots = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/slots/doctor/${doctorId}`);
        const updatedSlots = response.data.map((slot) => {
          const slotDateTime = new Date(
            `${slot.appointmentDate}T${slot.timeSlot}`
          );
          if (slotDateTime < new Date()) {
            slot.status = "Completed";
          }
          return slot;
        });
        setSlots(updatedSlots);
      } catch (error) {
        console.error("Error fetching slots:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
    fetchAppointments();
    fetchSlots();
  }, [doctorId]);

  const mergedData = [...appointments, ...slots].sort((a, b) => {
    const now = new Date();
    const dateA = new Date(`${a.appointmentDate}T${a.timeSlot}`);
    const dateB = new Date(`${b.appointmentDate}T${b.timeSlot}`);
    const isCompletedA = dateA < now;
    const isCompletedB = dateB < now;
    if (isCompletedA !== isCompletedB) {
      return isCompletedA ? 1 : -1;
    }
    if (dateA - dateB !== 0) {
      return dateA - dateB;
    }
    return a.timeSlot.localeCompare(b.timeSlot);
  });

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
        <Container
          fluid
          style={{
            background: "linear-gradient(to right,rgb(152, 197, 242), #ffffff)",
            minHeight: "100vh",
            padding: "2rem",
          }}
        >
          <Row className="justify-content-center">
            <Col md={10}>
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <h2
                    className="mb-4 text-center"
                    style={{ fontWeight: "bold" }}
                  >
                    Appointments & Slots for {doctorName}
                  </h2>
                  <Table hover responsive className="align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Date</th>
                        <th>Time Slot</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mergedData.map((item) => (
                        <tr key={item._id}>
                          <td>{item.appointmentDate}</td>
                          <td>{item.timeSlot}</td>
                          <td>{item.name}</td>
                          <td>{item.phone}</td>
                          <td>{item.age}</td>
                          <td>{item.gender}</td>
                          <td>
                            <Badge
                              bg={
                                item.status === "Completed"
                                  ? "success"
                                  : "warning"
                              }
                              pill
                            >
                              {item.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <div className="d-flex justify-content-center mt-4">
                    <Button
                      variant="primary"
                      onClick={() => window.history.back()}
                    >
                      &larr; Back
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
