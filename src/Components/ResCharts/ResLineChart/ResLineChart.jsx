import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ResLineChart = ({
  dataset = [
    {
      label: "2022",
      data: [100, 250, 150, 360, 420, 380, 115, 100, 165, 245, 312, 210],
      borderColor: "#2D9CDB",
      backgroundColor: "#2D9CDB",
    },
    {
      label: "2023",
      data: [150, 360, 420, 380, 470, 280, 165, 150, 195, 115, 100, 165],
      borderColor: "rgb(255, 91, 91)",
      backgroundColor: "rgb(255, 91, 91)",
    },
  ],
  labels= [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
}) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const data = {
    labels,
    datasets: dataset,
  };

  return <Line options={options} data={data} />;
};

export default ResLineChart;
