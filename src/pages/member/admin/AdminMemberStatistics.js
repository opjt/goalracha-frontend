import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Chart.js 컴포넌트에 필요한 요소 등록
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const AdminMemberStatistics = () => {
  const [chartData, setChartData] = useState({
    labels: [], // 월별 라벨
    datasets: [
      {
        label: '사업자 가입 수',
        data: [], // 월별 가입 수
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          // 추가 색상
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          // 추가 색상
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/member/owner')
      .then(response => response.json())
      .then(data => {
        console.log("Received data:", data); // 데이터 구조 확인을 위한 로그

        // 데이터 처리 및 차트 데이터 설정
        const labels = [];
        const ownerCounts = [];

        // 예시 데이터 처리 로직
        data.forEach(item => {
          labels.push(item.month); // 예: '1월', '2월', '3월'
          ownerCounts.push(item.count); // 예: 해당 월의 가입 수
        });

        setChartData(prevState => ({
          ...prevState,
          labels: labels,
          datasets: [
            {
              ...prevState.datasets[0],
              data: ownerCounts,
            },
          ],
        }));
      })
      .catch(error => console.error("Fetching error: ", error));
  }, []);

  return (
    <div className="admin-member-statistics">
      <h2>사업자 가입 통계</h2>
      <Doughnut data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default AdminMemberStatistics;
