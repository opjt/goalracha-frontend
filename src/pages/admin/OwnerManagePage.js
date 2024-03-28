import React, { useState, useEffect } from "react";
import { fetchOwners, fetchUserReservationsWithUserInfo } from "../../api/adminAPI";

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
    console.log('Selected owner:', owner); // 전체 owner 객체 확인
    console.log('Selected owner uno:', owner.uno); // owner의 uNo 값 확인

    try {
      const response = await fetchUserReservationsWithUserInfo(owner.uno);
      console.log(response); // 응답 출력
      setCurrentUserReservations(response.dtoList); // 가져온 데이터 저장
      setModalShow(true); // 모달 표시
    } catch (error) {
      console.error("Fetching user reservations with user info failed:", error);
    }
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
          {/* <h3 className="text-xl font-bold mb-4">{currentUser.name}님의 예약상세 정보</h3> */}
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100">장소</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100">예약 날짜</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100">시간</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100">가격</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100">사용자 이름</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100">사용자 이메일</th>
              </tr>
            </thead>
            <tbody>
              {currentUserReservations.map((reservation) => (
                <tr key={reservation.reserveId}>
                  <td className="px-5 py-5 border-b border-gray-200">{reservation.groundName}</td>
                  <td className="px-5 py-5 border-b border-gray-200">{reservation.reserveDate}</td>
                  <td className="px-5 py-5 border-b border-gray-200">{reservation.time}</td>
                  <td className="px-5 py-5 border-b border-gray-200">{reservation.price}</td>
                  <td className="px-5 py-5 border-b border-gray-200">{reservation.userName}</td>
                  <td className="px-5 py-5 border-b border-gray-200">{reservation.userEmail}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-4">
            <button onClick={() => setModalShow(false)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              닫기
            </button>
          </div>
        </div>
      </div>
    )}          
    </div>
  );
};

export default OwnerManagePage;
