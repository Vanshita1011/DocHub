// Validate form
export const validateForm = (formData) => {
  let newErrors = {};
  const nameRegex = /^[A-Za-z\s]+$/;
  const mobileRegex = /^[0-9]{10}$/;
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  if (!nameRegex.test(formData.name)) {
    newErrors.name = "Name should contain only alphabets.";
  }

  if (!mobileRegex.test(formData.phone)) {
    newErrors.phone = "Mobile Number should be exactly 10 digits.";
  }

  if (!formData.appointmentDate) {
    newErrors.appointmentDate = "Please select an appointment date.";
  } else if (formData.appointmentDate < today) {
    newErrors.appointmentDate = "Appointment date cannot be in the past.";
  }

  if (!formData.hospital) {
    newErrors.hospital = "Please select a preferred hospital.";
  }
  if (!formData.doctor) {
    newErrors.doctor = "Please select a preferred doctor.";
  }
  if (!formData.timeSlot) {
    newErrors.timeSlot = "Please select a time slot.";
  }
  if (!formData.gender) {
    newErrors.gender = "Please select your gender.";
  }
  if (!formData.age) {
    newErrors.age = "Please enter your age.";
  }

  return newErrors;
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
