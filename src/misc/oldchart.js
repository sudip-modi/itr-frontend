// components/ChartComponent.js
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const ChartComponent = ({ analyzedData }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    console.log("Chart component");
    if (analyzedData) {
        console.log(analyzedData);
      const aspects = ['Content', 'Instructor', 'Pacing', 'PracticalApplication', 'Engagement'];

      const aspectChartData = aspects.map((aspect) => {
        const aspectSentiments = analyzedData.map((entry) => entry[aspect]);
        const sentimentCounts = {
          Positive: aspectSentiments.filter((s) => s === 'Positive').length,
          Neutral: aspectSentiments.filter((s) => s === 'Neutral').length,
          Negative: aspectSentiments.filter((s) => s === 'Negative').length,
        };

        return {
          label: `${aspect} Sentiment`,
          data: Object.values(sentimentCounts),
          backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
        };
      });

      setChartData({
        labels: ['Positive', 'Neutral', 'Negative'],
        datasets: aspectChartData,
      });
    }
  }, [analyzedData]);

  return (
    <div>
      {chartData && (
        <Bar
          data={chartData}
          options={{
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
          }}
        />
      )}
    </div>
  );
};

export default ChartComponent;
