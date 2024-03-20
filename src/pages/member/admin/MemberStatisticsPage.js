import React, { useState, useEffect } from 'react';
import AdminMemberStatistics from './MemberStatistics';
import axios from 'axios';


const MemberStatisticsPage = () => {
  const [ownerCount, setOwnerCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    // 사업자 수를 가져오는 API 호출
    axios.get('http://localhost:8080/api/member/owner')
      .then(response => {
        console.log("사업자 API 응답:", response.data);
        setOwnerCount(response.data.length);
      })
      .catch(error => {
        console.error("사업자 API 호출 오류:", error);
      });

    // 사용자 수를 가져오는 API 호출
    axios.get('http://localhost:8080/api/member/user')
      .then(response => {
        console.log("사용자 API 응답:", response.data); // API 응답 로그 출력
        setUserCount(response.data.length);
      });
  }, []);

  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-2xl font-bold mb-5">회원 통계 (DB 연동)</h2>
      <AdminMemberStatistics ownerCount={ownerCount} userCount={userCount} />
    </div>
  );
};

export default MemberStatisticsPage;
