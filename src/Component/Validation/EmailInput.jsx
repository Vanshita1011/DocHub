import React, { useState } from "react";

const EmailInput = ({ value, onChange }) => {
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleBlur = () => {
    if (!value.trim()) {
      setError("Please enter your email address.");
    } else if (!validateEmail(value)) {
      setError("Please enter a valid email address.");
    } else {
      setError(""); // Clear error if valid
    }
  };

  return (
    <div>
      <input
        className="rounded-pill p-2 my-2"
        type="email"
        placeholder="Enter your email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
      />
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default EmailInput;
