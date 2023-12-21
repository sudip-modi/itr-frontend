// components/SidebarComponent.js
import React from "react";
import FileUploadComponent from "./FileUploadComponent";
import AdditionalInputComponent from "./AdditionalInputComponent";
import AspectDropdown from "./AspectDropdown";

const SidebarComponent = ({ onAnalysisData }) => {
  const handleFileUpload = async (file) => {
    // Your file upload logic
    console.log("File received in SidebarComponent:", file);
  };
  return (
    <div
      className="sidebar"
      style={{
        background: "#f0f0f0",
        padding: "20px",
        boxSizing: "border-box",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <AspectDropdown />
      <FileUploadComponent onFileUpload={handleFileUpload} />
      <AdditionalInputComponent />
    </div>
  );
};

export default SidebarComponent;
