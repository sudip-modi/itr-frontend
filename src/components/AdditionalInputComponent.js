// components/AdditionalInputComponent.js
import React, { useState } from "react";

const AdditionalInputComponent = () => {
  const [additionalInput, setAdditionalInput] = useState("");

  const handleInputChange = (event) => {
    setAdditionalInput(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://your-backend-api/additional-input-endpoint",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ additionalInput }),
        }
      );

      if (response.ok) {
        console.log("Additional input sent successfully!");
      } else {
        console.error("Failed to send additional input.");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <form>
        <label
          style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}
        >
          Additional Input:
        </label>
        <input
          type="text"
          placeholder="Additional Input"
          onChange={handleInputChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            boxSizing: "border-box",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
      </form>
      <button
        onClick={handleSubmit}
        style={{
          background: "#007bff",
          color: "white",
          padding: "15px",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
          transition: "background 0.3s ease-in-out",
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default AdditionalInputComponent;
