import React, { useState, useEffect } from "react";

const AdminUserManagePage = () => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/member/user")
      .then((response) => response.json())
      .then((data) => {
        setMembers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Fetching members failed:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>사용자 관리페이지 (DB연동)</h2>
      {isLoading ? (
        <p>Loading users...</p>
      ) : (
        <table className="min-w-full leading-normal mt-8">
          <thead>
            <tr className="text-left text-gray-700 bg-gray-200">
              <th className="px-5 py-3 border-b-2 border-gray-200">아이디</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">닉네임</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">전화번호</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">등록날짜</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">이메일</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">사업자명</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">
                사업자번호
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200">유저상태</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">유저타입</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.u_No} className="border-b border-gray-200">
                <td className="px-5 py-5">{member.id}</td>
                <td className="px-5 py-5">{member.nickname}</td>
                <td className="px-5 py-5">{member.tel}</td>
                <td className="px-5 py-5">{member.createdate}</td>
                <td className="px-5 py-5">{member.email}</td>
                <td className="px-5 py-5">{member.business_name}</td>
                <td className="px-5 py-5">{member.business_id}</td>
                <td className="px-5 py-5">{member.state}</td>
                <td className="px-5 py-5">{member.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUserManagePage;
