import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdditionalInputComponent from "./AdditionalInputComponent";
import ChartComponent from "./ChartComponent";

const Layout = () => {
  const aspects = [
    "Content",
    "Instructor",
    "Pacing",
    "Practical Application",
    "Engagement",
  ];
  const [analyzedData, setAnalyzedData] = useState(null);
  const [selectedAspect, setSelectedAspect] = useState("");
  //   const handleAnalysisData = (data) => {
  //     setAnalyzedData(data);
  //     console.log(data);
  //   };

  //   ==================================
  // aspect dropdown
  // =================================

  const handleAspectChange = (event) => {
    setSelectedAspect(event.target.value);
  };

  const handleAspectSubmit = async () => {
    try {
      const response = await fetch("http://your-backend-api/endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedAspect }),
      });

      if (response.ok) {
        console.log("Data sent successfully!");
      } else {
        console.error("Failed to send data.");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  //   ==================================
  // aspect dropdown
  // =================================

  // ===============================
  // file upload component
  // ===============================
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      // Assume selectedAspect is a state variable containing the selected aspect value
      formData.append("selectedAspect", selectedAspect);

      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("File uploaded successfully!");
        // Call the onFileUpload function with the selected file
        console.log(response);
        const responseData = await response.json();

        // Print the response data
        console.log(responseData.data);
        setAnalyzedData(responseData.data);
      } else {
        console.error("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  // ===============================
  // file upload component
  // ===============================

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    console.log("Chart component");
    if (analyzedData) {
      console.log(analyzedData);
      const aspects = [
        "Content",
        "Instructor",
        "Pacing",
        "PracticalApplication",
        "Engagement",
      ];

      const aspectChartData = aspects.map((aspect) => {
        const aspectSentiments = analyzedData.map((entry) => entry[aspect]);
        const sentimentCounts = {
          Positive: aspectSentiments.filter((s) => s === "Positive").length,
          Neutral: aspectSentiments.filter((s) => s === "Neutral").length,
          Negative: aspectSentiments.filter((s) => s === "Negative").length,
        };

        return {
          label: `${aspect} Sentiment`,
          data: Object.values(sentimentCounts),
          backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
        };
      });

      setChartData({
        labels: ["Positive", "Neutral", "Negative"],
        datasets: aspectChartData,
      });
    }
  }, [analyzedData]);

  return (
    <>
      <Col xs={3} className="sidebar-container">
        <div
          className="sidebar"
          style={{
            background: "#f0f0f0",
            padding: "20px",
            boxSizing: "border-box",
            boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* ========================================= */}
          <div className="ad-container">
            <form
              style={{ marginBottom: "20px" }}
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "10px",
                    fontWeight: "bold",
                  }}
                >
                  Select Aspect:
                </label>
                <select
                  value={selectedAspect}
                  onChange={handleAspectChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginBottom: "15px",
                    boxSizing: "border-box",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                  }}
                >
                  <option value="">Select an Aspect</option>
                  {aspects.map((aspect) => (
                    <option key={aspect} value={aspect}>
                      {aspect}
                    </option>
                  ))}
                  {/* Add more options as needed */}
                </select>
              </div>
              <button
                onClick={handleAspectSubmit}
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
            </form>
          </div>
          {/* ========================================= */}
          <div
            className="file-upload-container"
            style={{ marginBottom: "20px" }}
          >
            <form>
              <label
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}
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
          <AdditionalInputComponent />
        </div>
      </Col>
      <Col xs={12} className="chart-layout">
        <ChartComponent analyzedData={analyzedData} />
      </Col>
    </>
  );
};

export default Layout;
