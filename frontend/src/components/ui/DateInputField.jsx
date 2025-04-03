import React, { useState } from "react";

const DateInputField = ({ value, onChange, placeholder }) => {
  const [dateInput, setDateInput] = useState(value || '');

  // Format raw input (ddMMyyyy) to dd/MM/yyyy
  const formatInput = (rawValue) => {
    // Remove all non-digit characters
    const digitsOnly = rawValue.replace(/\D/g, '');
    
    if (digitsOnly.length <= 2) {
      return digitsOnly;
    }
    if (digitsOnly.length <= 4) {
      return `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2)}`;
    }
    return `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2, 4)}/${digitsOnly.slice(4, 8)}`;
  };

  const handleDateChange = (e) => {
    const rawValue = e.target.value;
    const formattedValue = formatInput(rawValue);
    
    setDateInput(formattedValue);

    // Check if we have a complete date (dd/MM/yyyy)
    if (formattedValue.length === 10) {
      onChange(formattedValue);
    } else {
      onChange(''); // Clear the value if not complete
    }
  };

  return (
    <input
      type="text"
      value={dateInput}
      onChange={handleDateChange}
      placeholder={placeholder || "dd/MM/yyyy"}
      className="border p-2 w-full"
      maxLength={10} // dd/MM/yyyy is 10 characters
      style={{
        width: "120px",
        padding: "8px 10px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        transition: "border-color 0.3s, box-shadow 0.3s",
        marginRight: "4px",
      }}
      onFocus={(e) => (e.target.style.borderColor = "#007bff")}
      onBlur={(e) => (e.target.style.borderColor = "#ccc")}
    />
  );
};

export default DateInputField;
