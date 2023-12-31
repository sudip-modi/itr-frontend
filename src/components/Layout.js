import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { Bar, Line, Pie } from "react-chartjs-2";
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


const SentimentCharts = ({
  sentimentCountData,
  datewiseSentimentCountData,
  aspectSentimentCountData,
}) => {
  const [barChartData, setBarChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);
  const [aspectBarChartData, setAspectBarChartData] = useState(null);

  const lineOptions = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Chart.js Line Chart - Multi Axis",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const aspectChartOptions = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  useEffect(() => {
    // console.log("DATEWISESENTOMENTCOUNTDATA");
    // console.log(datewiseSentimentCountData);
    // console.log("SENTIMENTCOUNTDATA");
    // console.log(sentimentCountData);
    // Prepare data for bar chart
    const barData = {
      labels: Object.keys(sentimentCountData),
      datasets: [
        {
          label: "Sentiments",
          data: Object.values(sentimentCountData),
          backgroundColor: ["#F44336", "#FFC107", "#4CAF50", "#757575"],
        },
      ],
    };
    setBarChartData(barData);


    // =============================================
    // Prepare data for pie chart
    const total = Object.values(sentimentCountData).reduce(
      (acc, count) => acc + count,
      0
    );
    const pieData = {
      labels: Object.keys(sentimentCountData),
      datasets: [
        {
          data: Object.values(sentimentCountData).map(
            (count) => (count / total) * 100
          ),
          backgroundColor: ["#F44336", "#FFC107", "#4CAF50", "#757575"],
        },
      ],
    };
    setPieChartData(pieData);


    // ===============================================
    // prepare data for line chart
    const lineData = {
      labels: Object.keys(datewiseSentimentCountData),
      datasets: [
        {
          label: "POS",
          data: Object.values(datewiseSentimentCountData).map(
            (counts) => counts["POS"]
          ),
          backgroundColor: ["#F44336", "#FFC107", "#4CAF50", "#757575"],
          borderColor: "rgb(255, 99, 132)",
          yAxisID: "y",
        },
        {
          label: "NEG",
          data: Object.values(datewiseSentimentCountData).map(
            (counts) => counts["NEG"]
          ),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          yAxisID: "y1",
        },
        {
          label: "NEU",
          data: Object.values(datewiseSentimentCountData).map(
            (counts) => counts["NEU"]
          ),
          borderColor: "rgba(0, 60, 113, 0.5)",
          backgroundColor: "rgba(0, 60, 113, 0.5)",
          yAxisID: "y2",
        },
        {
          label: "N/A",
          data: Object.values(datewiseSentimentCountData).map(
            (counts) => counts["N/A"]
          ),
          borderColor: "rgba(0, 60, 113, 0.5)",
          backgroundColor: "rgba(0, 60, 113, 0.5)",
          yAxisID: "y3",
        },
      ],
    };
    setLineChartData(lineData);

    // ========================================================
    // prepare data for aspectBarChart
    const aspectBarData = {
        labels: aspectSentimentCountData.aspects,
        datasets: [
          {
            label: "Positive",
            data: aspectSentimentCountData.positive_counts,
            backgroundColor: "green",
          },
          {
            label: "Neutral",
            data: aspectSentimentCountData.neutral_counts,
            backgroundColor: "yellow",
          },
          {
            label: "Negative",
            data: aspectSentimentCountData.negative_counts,
            backgroundColor: "red",
          },
        ],
      }
      setAspectBarChartData(aspectBarData)
  }, [sentimentCountData, datewiseSentimentCountData, aspectSentimentCountData]);

  return (
    <div>
      {barChartData && (
        <div>
          <h2>Bar Chart</h2>
          <Bar data={barChartData} />
        </div>
      )}
      {pieChartData && (
        <div>
          <h2>Pie Chart</h2>
          <Pie data={pieChartData} />
        </div>
      )}
      {lineChartData && (
        <div>
          <h2>Line Chart</h2>
          <Line options={lineOptions} data={lineChartData} />
        </div>
      )}
      {aspectBarChartData && (
        <div>
          <h2>Aspect-Based Sentiment Analysis</h2>
          <Bar data={aspectBarChartData} options={aspectChartOptions} />
        </div>
      )}
    </div>
  );
};

const Layout = () => {
  const aspects = [
    "Quality",
    "Content",
    "Instructor",
    "Material",
    "Engagement",
    "Application",
    "Structure",
  ];
  const [sentimentCountData, setSentimentCountData] = useState(null);
  const [datewiseSentimentData, setDatewiseSentimentData] = useState(null);
  const [aspectSentimentData, setAspectSentimentData] = useState(null);
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


       //   ==============================================================================
       const aspectCount = await fetch("http://localhost:5000/analyze_aspect", {
        method: "POST",
        body: formData,
      });
      if (aspectCount.ok) {
        console.log("File uploaded successfully!");
        // you cannot do await json if you have already done json
        const aspectResData = await aspectCount.json();
        console.log(aspectResData);
        setAspectSentimentData(aspectResData);
      } else {
        console.error("Failed to upload file.");
      }
      //   ==============================================================================
      const dateSentiCount = await fetch(
        "http://localhost:5000/analyze_datewise",
        {
          method: "POST",
          body: formData,
        }
      );
      if (dateSentiCount.ok) {
        console.log("File uploaded successfully!");
        // you cannot do await json if you have already done json
        const dateSentiCountData = await dateSentiCount.json();
        console.log(dateSentiCountData);
        setDatewiseSentimentData(dateSentiCountData);
      } else {
        console.error("Failed to upload file.");
      }
      //   ==============================================================================
      const sentiCount = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData,
      });
      if (sentiCount.ok) {
        console.log("File uploaded successfully!");
        // you cannot do await json if you have already done json
        const sentiResData = await sentiCount.json();
        console.log(sentiResData);
        setSentimentCountData(sentiResData);
      } else {
        console.error("Failed to upload file.");
      }
     
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
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
                accept=".csv"
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
          {sentimentCountData && (
            <SentimentCharts
              sentimentCountData={sentimentCountData}
              datewiseSentimentCountData={datewiseSentimentData}
              aspectSentimentCountData={aspectSentimentData}
            />
          )}
        </div>
      </Col>
    </>
  );
};

export default Layout;
