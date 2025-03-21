import React from "react";
import { Form } from "react-bootstrap";
import { generateTimeSlots, generateUpcomingDates } from "./formUtils";

const AppointmentForm = ({
  formData,
  errors,
  handleInputChange,
  handleSubmit,
  filteredHospitals,
  filteredDoctors,
}) => {
  return (
    <form className="p-3 rounded book-form" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter your name"
        />
        {errors.name && <p className="text-danger bg-warning">{errors.name}</p>}
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
          <p className="text-danger bg-warning">{errors.phone}</p>
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
          <p className="text-danger bg-warning p-1 rounded">{errors.age}</p>
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
          <p className="text-danger bg-warning p-1 rounded">{errors.gender}</p>
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
          {generateTimeSlots(formData.appointmentDate).map((slot, index) => (
            <option key={index} value={slot}>
              {slot}
            </option>
          ))}
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
          <option value="">Choose preferred Hospital</option>
          {filteredHospitals.map((hospital, index) => (
            <option key={index} value={hospital}>
              {hospital}
            </option>
          ))}
        </Form.Control>
        {errors.hospital && (
          <p className="text-danger bg-warning">{errors.hospital}</p>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Doctor</Form.Label>
        <Form.Control
          as="select"
          name="doctor"
          value={formData.doctor}
          onChange={handleInputChange}
          disabled={!formData.hospital}
        >
          <option value="">Choose preferred Doctor</option>
          {filteredDoctors
            .filter((doctor) => doctor.hospital === formData.hospital)
            .map((doctor, index) => (
              <option key={index} value={doctor._id}>
                {doctor.name}
              </option>
            ))}
        </Form.Control>
        {errors.doctor && (
          <p className="text-danger bg-warning">{errors.doctor}</p>
        )}
      </Form.Group>

      <button type="submit" className="bkbtn">
        Book Appointment
      </button>
    </form>
  );
};
export default AppointmentForm;
