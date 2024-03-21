import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesStatistics = ({ dailySales }) => {
  const data = {
    labels: dailySales.map(item => item.date),
    datasets: [
      {
        label: '일자별 총 매출액',
        data: dailySales.map(item => item.totalSales),
        backgroundColor: 'rgb(135, 206, 235)',
        borderColor: 'rgba(135, 206, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h3>일자별 총 매출액(SalesStatistics)</h3>
      <Bar data={data} />
    </div>
  );
};

export default SalesStatistics;
