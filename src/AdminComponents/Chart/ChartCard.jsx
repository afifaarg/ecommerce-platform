// ChartCard.jsx
import React, { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart, Filler } from "chart.js";

// Register the Filler plugin
Chart.register(Filler);

const ChartCard = () => {
  const chartRef = useRef(null);

  // Sample data for the chart
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sample Data",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  useEffect(() => {
    // Cleanup function to destroy the chart instance when the component unmounts
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy(); // Destroy chart instance
      }
    };
  }, []);

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default ChartCard;
