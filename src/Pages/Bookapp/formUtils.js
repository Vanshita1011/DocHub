export const validateForm = (formData) => {
  let errors = {};
  const nameRegex = /^[A-Za-z\s]+$/;
  const mobileRegex = /^(\+?\d{1,3}[-.\s]?)?\d{10}$/;
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  if (!nameRegex.test(formData.name)) {
    errors.name = "Name should contain only alphabets.";
  }

  if (!mobileRegex.test(formData.phone)) {
    errors.phone = "Mobile Number should be exactly 10 digits.";
  }

  if (!formData.appointmentDate) {
    errors.appointmentDate = "Please select an appointment date.";
  } else if (formData.appointmentDate < today) {
    errors.appointmentDate = "Appointment date cannot be in the past.";
  }

  if (!formData.hospital) {
    errors.hospital = "Please select a preferred hospital.";
  }
  if (!formData.doctor) {
    errors.doctor = "Please select a preferred doctor.";
  }
  if (!formData.timeSlot) {
    errors.timeSlot = "Please select a time slot.";
  }

  if (!["male", "female"].includes(formData.gender?.toLowerCase())) {
    errors.gender = "Please select a valid gender.";
  }

  if (formData.age < 0 || formData.age > 120) {
    errors.age = "Please enter a valid age.";
  }

  return errors;
};

// Generate upcoming 10 dates
export const generateUpcomingDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 10; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date.toISOString().split("T")[0]); // Format date as YYYY-MM-DD
  }
  return dates;
};

// Generate time slots
export const generateTimeSlots = (appointmentDate) => {
  const slots = [];
  const currentTime = new Date();
  const selectedDate = new Date(appointmentDate);

  for (let hour = 8; hour <= 20; hour++) {
    ["00", "30"].forEach((minutes) => {
      const slotTime = new Date(selectedDate);
      slotTime.setHours(hour, minutes);

      // Show only upcoming time slots for today
      if (selectedDate.toDateString() === currentTime.toDateString()) {
        if (slotTime > currentTime) {
          slots.push(`${hour}:${minutes}`);
        }
      } else {
        slots.push(`${hour}:${minutes}`);
      }
    });
  }
  return slots;
};
