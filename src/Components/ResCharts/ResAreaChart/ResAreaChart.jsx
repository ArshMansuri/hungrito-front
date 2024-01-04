import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
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
  Filler,
  Legend
);

const ResAreaChart = ({
  value = [100, 150, 350, 200, 60, 230, 120, 200, 350, 400, 300, 250],
  borCol = "rgb(53, 162, 235)",
  bg = "rgba(53, 162, 235, 0.5)",
  labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
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
    datasets: [
      {
        fill: true,
        label: "",
        data: value,
        borderColor: borCol,
        backgroundColor: bg,
        borderWidth: 2,
        borderCapStyle: "round",
        borderJoinStyle: "round",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default ResAreaChart;
