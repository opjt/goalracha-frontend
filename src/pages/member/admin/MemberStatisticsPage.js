import React, { useState, useEffect } from 'react';
import AdminMemberStatistics from './MemberStatistics';
import axios from 'axios';
import { fetchMembers } from "../../../api/adminAPI";
import { fetchOwners } from "../../../api/adminAPI";


const MemberStatisticsPage = () => {
  const [ownerCount, setOwnerCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 사업자 목록을 가져오는 함수 호출
        const owners = await fetchOwners();
        setOwnerCount(owners.length);

        // 사용자 목록을 가져오는 함수 호출
        const users = await fetchMembers();
        setUserCount(users.length);
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-2xl font-bold mb-5">회원 통계 (DB 연동)</h2>
      <AdminMemberStatistics ownerCount={ownerCount} userCount={userCount} />
    </div>
  );
};

export default MemberStatisticsPage;
