import React, { useState, useEffect } from "react";
import { fetchMembers } from "../../../api/adminAPI";

const AdminUserManagePage = () => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMembers()
      .then((data) => {
        setMembers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Fetching members failed:", error);
        setIsLoading(false);
      });
  }, []);

  // 검색어에 따른 필터링 로직 추가
  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-5">
      {/* 타이틀과 검색 입력 필드를 Flexbox로 정렬 */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-5">사용자 관리페이지 (DB연동)</h2>
        <input
          type="text"
          placeholder="사용자 검색..."
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
        <p>Loading users...</p>
      ) : (
        <table className="min-w-full leading-normal mt-8">
          <thead>
            <tr className="text-left text-gray-700 bg-gray-200">
              <th className="px-5 py-3 border-b-2 border-gray-200">이름</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">
                아이디/이메일
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200">전화번호</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">닉네임</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">멤버타입</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">가입일자</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.u_No} className="border-b border-gray-200">
                {console.log(member)}
                <td className="px-5 py-5">{member.name}</td>
                <td className="px-5 py-5">{member.email}</td>{" "}
                {/* 카카오톡로그인이라 id, email동일 */}
                <td className="px-5 py-5">{member.tel}</td>
                <td className="px-5 py-5">{member.nickname}</td>
                <td className="px-5 py-5">{member.type}</td>
                <td className="px-5 py-5">{member.createDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUserManagePage;