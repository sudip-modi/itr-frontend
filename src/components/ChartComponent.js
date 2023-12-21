// ChartComponent.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

const SentimentBarChart = ({ sentimentData }) => {
  const data = {
    labels: Object.keys(sentimentData),
    datasets: [
      {
        label: 'Sentiments',
        data: Object.values(sentimentData),
        backgroundColor: ['#F44336', '#FFC107', '#4CAF50'],
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

const ChartComponent = ({ analyzedData }) => {
  return (
    <div>
      {analyzedData && <SentimentBarChart sentimentData={analyzedData} />}
    </div>
  );
};

export default ChartComponent;
