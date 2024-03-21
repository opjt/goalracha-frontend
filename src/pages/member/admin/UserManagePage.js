import React, { useState, useEffect } from "react";
import { fetchMembers, fetchReservationsForUser } from "../../../api/adminAPI";

const UserManagePage = () => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalShow, setModalShow] = useState(false); // 모달 표시 상태
  const [currentUser, setCurrentUser] = useState(null); // 현재 선택된 사용자 정보
  const [currentUserReservations, setCurrentUserReservations] = useState([]); // 현재 선택된 사용자의 예약 정보 상태

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

  // const handleUserClick = (member) => {
  //   setCurrentUser(member); // 선택된 사용자 정보 설정
  //   setModalShow(true); // 모달 표시
  // };

  const handleUserClick = async (member) => {
    setCurrentUser(member); // 선택된 사용자 정보 설정
    const reservations = await fetchReservationsForUser(member.name); // 예약 정보 가져오기
    setCurrentUserReservations(reservations); // 가져온 예약 정보 저장
    setModalShow(true); // 모달 표시
  };

  const handleCloseModal = () => {
    setModalShow(false); // 모달 숨김
  };

  
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
              <th className="px-5 py-3 border-b-2 border-gray-200">아이디/이메일</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">전화번호</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">닉네임</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">멤버타입</th>
              <th className="px-5 py-3 border-b-2 border-gray-200">가입일자</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.u_No} className="border-b border-gray-200 cursor-pointer" onClick={() => handleUserClick(member)}>
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

      {/* 모달 구현 */}
      {modalShow && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg">
            <h3 className="text-xl font-bold mb-4">{currentUser.name}님의 예약상세 정보</h3>
            <ul>
              {currentUserReservations.map((reservation, index) => (
                <li key={index}>
                  장소: {reservation.groundName}, 예약 날짜: {new Date(reservation.reserveDate).toLocaleDateString()}, 시간: {reservation.time}, 가격: {reservation.price}
                </li>
             ))}
            </ul>
            <button onClick={handleCloseModal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagePage;