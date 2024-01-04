import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ResPieChart = ({value=[0,0], bg=["rgb(255, 91, 91)", "rgba(255, 91, 91, 0.15)"], title=""}) => {
  const data = {
    // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: "# of Votes",
        data: value,
        backgroundColor: bg,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      doughnutlabel: {
        labels: [
          {
            text: "100", // Display the total value here
            font: {
              size: 24,
              weight: "bold",
            },
          },
        ],
      },
    },
  };
  const total = data.datasets[0].data[0];
  return (
    <div >
    <div style={{position: "relative" }}>
      <Doughnut data={data} options={options} />
      <div
        style={{
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          width: "100%",
        }}
      >
        <span className="center-text">{total}%</span>
      </div>
    </div>
    <div className="d-flex justify-content-center align-items-center bottem-text pt-2" >{title}</div>
    </div>

  );
};

export default ResPieChart;
