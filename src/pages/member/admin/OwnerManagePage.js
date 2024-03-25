import React, { useState, useEffect } from "react";
import { fetchOwners, fetchReservationsForUser } from "../../../api/adminAPI";

const OwnerManagePage = () => {
  const [owners, setOwners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalShow, setModalShow] = useState(false); // 모달 표시 상태
  const [currentUser, setCurrentUser] = useState(null); // 현재 선택된 사용자 정보
  const [currentUserReservations, setCurrentUserReservations] = useState([]); // 현재 선택된 사용자의 예약 정보 상태

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


  const handleUserClick = async (owner) => {
    setCurrentUser(owner); // 선택된 사용자 정보 설정
    const reservations = await fetchReservationsForUser(owner.businessName); // 예약 정보 가져오기
    setCurrentUserReservations(reservations); // 가져온 예약 정보 저장
    setModalShow(true); // 모달 표시
  };

  const handleCloseModal = () => {
    setModalShow(false); // 모달 숨김
  };


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
              <th className="px-5 py-3 border-b-2 border-gray-200">사업자명</th>
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
              <tr key={owner.uNo} className="border-b border-gray-200 cursor-pointer" onClick={() => handleUserClick(owner)}>
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

      {/* 모달 구현 */}
      {modalShow && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg w-3/4 max-w-4xl">
            <h3 className="text-xl font-bold mb-4">{currentUser.businessName}의 예약상세 정보</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">장소</th>
                    <th className="py-3 px-6 text-left">예약 날짜</th>
                    <th className="py-3 px-6 text-left">시간</th>
                    <th className="py-3 px-6 text-left">가격</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {currentUserReservations.map((reservation, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">{reservation.groundName}</td>
                      <td className="py-3 px-6 text-left">{new Date(reservation.reserveDate).toLocaleDateString()}</td>
                      <td className="py-3 px-6 text-left">{reservation.time}</td>
                      <td className="py-3 px-6 text-left">{reservation.price}원</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={handleCloseModal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors">
              닫기
            </button>
          </div>
        </div>
      )}          
    </div>
  );
};

export default OwnerManagePage;
