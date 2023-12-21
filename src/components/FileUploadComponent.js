// components/FileUploadComponent.js
import React, { useState } from "react";

const FileUploadComponent = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("File uploaded successfully!");
        // Call the onFileUpload function with the selected file
        onFileUpload(file);
      } else {
        console.error("Failed to upload file.");
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
          Upload CSV:
        </label>
        <input
          type="file"
          onChange={handleFileChange}
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
        onClick={handleUpload}
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
        Upload
      </button>
    </div>
  );
};

export default FileUploadComponent;
