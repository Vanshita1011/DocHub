import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { Modal, Button } from "react-bootstrap";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { enUS } from "date-fns/locale";
import api from "../axiosInterceptor";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DnDCalendar = withDragAndDrop(Calendar);

const DoctorCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchAppointments = async () => {
    const doctorId = localStorage.getItem("doctorId");
    if (!doctorId) return;

    try {
      const res = await api.get(`/appointments/doctor/${doctorId}`);
      const formattedEvents = res.data.map((appt) => {
        const start = new Date(`${appt.appointmentDate}T${appt.timeSlot}`);
        const end = new Date(start.getTime() + 30 * 60000); // 30 mins

        return {
          _id: appt._id,
          title: appt.name,
          start,
          end,
          status: appt.status || "confirmed",
          phone: appt.phone,
          gender: appt.gender,
          age: appt.age,
        };
      });
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleEventDrop = async ({ event, start }) => {
    try {
      await api.put(`/appointments/${event._id}`, {
        appointmentDate: format(start, "yyyy-MM-dd"),
        timeSlot: format(start, "HH:mm"),
      });
      alert("Appointment rescheduled!");
      fetchAppointments();
    } catch (error) {
      alert("Failed to reschedule");
    }
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = "#007bff";
    if (event.status === "cancelled") backgroundColor = "gray";
    if (event.status === "upcoming") backgroundColor = "green";
    if (event.status === "completed") backgroundColor = "red";

    return { style: { backgroundColor, borderRadius: "6px", color: "white" } };
  };

  return (
    <div style={{ height: "80vh", margin: "20px" }}>
      <h4 className="mb-3">📅 Doctor's Appointment Calendar</h4>
      <DnDCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
        onEventDrop={handleEventDrop}
        draggableAccessor={() => true}
        eventPropGetter={eventStyleGetter}
        style={{ height: "100%" }}
      />

      {/* Modal for event details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent && (
            <>
              <p>
                <strong>Patient:</strong> {selectedEvent.title}
              </p>
              <p>
                <strong>Phone:</strong> {selectedEvent.phone}
              </p>
              <p>
                <strong>Gender:</strong> {selectedEvent.gender}
              </p>
              <p>
                <strong>Age:</strong> {selectedEvent.age}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {format(selectedEvent.start, "yyyy-MM-dd")}
              </p>
              <p>
                <strong>Time:</strong> {format(selectedEvent.start, "HH:mm")}
              </p>
              <p>
                <strong>Status:</strong> {selectedEvent.status}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DoctorCalendar;
