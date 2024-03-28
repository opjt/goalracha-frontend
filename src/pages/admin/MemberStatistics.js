import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
Chart.register(ArcElement);

const AdminMemberStatistics = ({ ownerCount, userCount }) => {

  console.log("사업자 수:", ownerCount);
  console.log("사용자 수:", userCount);

  const data = {
    labels: ['사업자', '사용자'],
    datasets: [
      {
        data: [ownerCount, userCount],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

    // options 변수 정의
    const options = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false, // 차트 내부의 범례 비활성화
        },
      }
    };
      
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '60%', height: '400px' }}> {/* 차트 크기 조정 */}
          <Doughnut data={data} options={options} />
        </div>
        <div style={{ marginLeft: '20px' }}>
          <h3>회원 통계</h3>
          <p>사업자: {ownerCount}명</p>
          <p>사용자: {userCount}명</p>
        </div>
      </div>
    );
  };
  
  export default AdminMemberStatistics;
