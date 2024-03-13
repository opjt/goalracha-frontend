import React, { useState, useEffect } from "react";

const AdminOwnerManagePage = () => {
  const [owners, setOwners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/member/owner")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data fetched:", data);
        setOwners(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Fetching members failed:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>사업자 관리페이지 (DB연동)</h2>
      {isLoading ? (
        <p>Loading owners...</p>
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
              <th className="px-5 py-3 border-b-2 border-gray-200">사업자번호</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">유저상태</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">유저타입</th>
            </tr>
          </thead>
          <tbody>
            {owners.map((owner) => (
              <tr key={owner.uNo} className="border-b border-gray-200">
                <td className="px-5 py-5">{owner.id}</td>
                <td className="px-5 py-5">{owner.nickname}</td>
                <td className="px-5 py-5">{owner.tel}</td>
                <td className="px-5 py-5">{owner.createdate}</td>
                <td className="px-5 py-5">{owner.email}</td>
                <td className="px-5 py-5">{owner.business_name}</td>
                <td className="px-5 py-5">{owner.business_id}</td>
                <td className="px-5 py-5">{owner.state}</td>
                <td className="px-5 py-5">{owner.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOwnerManagePage;
