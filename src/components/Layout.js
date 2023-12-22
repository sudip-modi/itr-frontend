import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SentimentBarChart = ({ sentimentData }) => {
  const data = {
    labels: Object.keys(sentimentData),
    datasets: [
      {
        label: "Sentiments",
        data: Object.values(sentimentData),
        backgroundColor: ["#F44336", "#FFC107", "#4CAF50"],
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

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
  const [file, setFile] = useState(null);

  //   ==================================
  // aspect dropdown handle value change
  // =================================
  const handleAspectChange = (event) => {
    setSelectedAspect(event.target.value);
  };
  // ===============================
  // file upload component
  // ===============================
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
        // console.log(response.json());
        // you cannot do await json if you have already done json
        const responseData = await response.json();

        // Print the response data
        console.log(responseData);
        console.log(response);
        setAnalyzedData(responseData);
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

//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     console.log("Chart component");
//     if (analyzedData) {
//       const data = {
//         labels: Object.keys(analyzedData),
//         datasets: [
//           {
//             label: "Sentiments",
//             data: Object.values(analyzedData),
//             backgroundColor: ["#F44336", "#FFC107", "#4CAF50"],
//           },
//         ],
//       };

//       const options = {
//         responsive: true,
//         scales: {
//           x: {
//             grid: {
//               display: false,
//             },
//           },
//           y: {
//             beginAtZero: true,
//             ticks: {
//               stepSize: 1,
//             },
//           },
//         },
//       };
//     }
//   }, [analyzedData]);

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
        </div>
      </Col>
      <Col xs={12} className="chart-layout">
        <div>
          {analyzedData && <SentimentBarChart sentimentData={analyzedData} />}
        </div>
      </Col>
    </>
  );
};

export default Layout;
