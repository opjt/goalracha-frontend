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

const ReserveStatistics = ({ dailyReserveCounts }) => {
  // 차트 데이터 설정
  const data = {
    labels: dailyReserveCounts.map(item => item.date),
    datasets: [
      {
        label: '일자별/시간당 예약 수',
        data: dailyReserveCounts.map(item => item.count),
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h3>일자별/시간당 예약건수(ReserveStatistics)</h3>
      <Bar data={data} />
    </div>
  );
};

export default ReserveStatistics;
