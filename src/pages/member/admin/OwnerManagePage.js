import React, { useState, useEffect } from "react";
import { fetchOwners } from "../../../api/adminAPI";

const OwnerManagePage = () => {
  const [owners, setOwners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOwners()
      .then((data) => {
        setOwners(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Fetching owners failed:", error);
        setIsLoading(false);
      });
  }, []);

  const filteredOwners = owners.filter(
    (owner) =>
      owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      owner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (owner.businessName &&
        owner.businessName.toLowerCase().includes(searchTerm.toLowerCase())) // businessName이 정의된 경우에만 검색에 포함
  );

  return (
    <div className="container mx-auto mt-5">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-5">사업자 관리페이지 (DB연동)</h2>
        <input
          type="text"
          placeholder="사업자 검색..."
          className="input border p-2"
          style={{
            padding: "10px",
            fontSize: "1rem",
            border: "2px solid #4A90E2",
            boxShadow: "0 4px 6px rgba(32, 33, 36, 0.28)",
            borderRadius: "5px",
            width: "300px",
            transition: "all 0.3s",
          }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <p>Loading owners...</p>
      ) : (
        <table className="min-w-full leading-normal mt-8">
          <thead>
            <tr className="text-left text-gray-700 bg-gray-200">
              <th className="px-5 py-3 border-b-2 border-gray-200">구장명</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">담당자 이름</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">아이디</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">이메일</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">전화번호</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">
                사업자 번호
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200">멤버타입</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">가입일자</th>
            </tr>
          </thead>
          <tbody>
            {filteredOwners.map((owner) => (
              <tr key={owner.uNo} className="border-b border-gray-200">
                {console.log(owner)}
                <td className="px-5 py-5">{owner.businessName}</td>
                <td className="px-5 py-5">{owner.name}</td>
                <td className="px-5 py-5">{owner.userId}</td>
                <td className="px-5 py-5">{owner.email}</td>
                <td className="px-5 py-5">{owner.tel}</td>
                <td className="px-5 py-5">{owner.businessId}</td>
                <td className="px-5 py-5">{owner.type}</td>
                <td className="px-5 py-5">{owner.createDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OwnerManagePage;
