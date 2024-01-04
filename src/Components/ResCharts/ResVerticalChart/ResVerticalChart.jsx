import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const ResVerticalChart = () => {
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        },
      };

      const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      const data = {
        labels,
        datasets: [
          {
            label: '',
            data: [100, 150, 350, 200, 60, 230, 120],
            backgroundColor: 'rgb(255, 91, 91)',
          },
        ],
      };

  return (
    <Bar options={options} data={data} />
  )
}

export default ResVerticalChart