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

const ResVerticalChart = ({labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], value=[100, 150, 350, 200, 60, 230, 120]}) => {
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        },
      };


      const data = {
        labels,
        datasets: [
          {
            label: '',
            data: value,
            backgroundColor: 'rgb(255, 91, 91)',
          },
        ],
      };

  return (
    <Bar options={options} data={data} />
  )
}

export default ResVerticalChart