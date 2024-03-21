import React, { useEffect, useState } from "react";
import { getAllReserveList } from "api/reserveApi";

const ReserveListPage = () => {
  const [reserveList, setReserveList] = useState([]); // 예약 목록 상태 설정
  const [page, setPage] = useState(1); // 페이지 상태 설정
  const [size] = useState(10); // 페이지 크기 상수 설정
  const [pageData, setPageData] = useState({}); // 페이지 데이터 상태 설정
  const [searchTerm, setSearchTerm] = useState("");

  // 페이지 로드 시 예약 목록 및 페이지 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const reserveData = await getAllReserveList({ page, size }); // 예약 목록 가져오기
        console.log("Received reserve data:", reserveData); // API 호출을 통해 받은 데이터를 콘솔에 로그
        setReserveList(reserveData.dtoList); // 예약 목록 상태를 새로운 데이터로 업데이트
        setPageData(reserveData); // 페이지 데이터 상태 업데이트
      } catch (error) {
        console.error("Error fetching reservation list:", error);
      }
    };
    fetchData(); // 함수 호출

    // 페이지 이동 시 reserveList 상태 초기화
    return () => {
      setReserveList([]);
    };
  }, [page, size]); // 페이지 또는 크기 상태가 변경될 때마다 재로드

  const filteredReserveList = reserveList.filter(
    (reserve) =>
      reserve.groundName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reserve.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reserve.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reserve.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 예약 목록 표시
  return (
    <div className="container mx-auto mt-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">예약 리스트(DB 연동)</h2>
        <input
          type="text"
          placeholder="예약 검색..."
          className="input border p-2" // 스타일을 조정해 입력 필드를 눈에 띄게 만듭니다.
          style={{
            padding: "10px",
            fontSize: "1rem",
            border: "2px solid #4A90E2", // 테두리 색상 변경
            boxShadow: "0 4px 6px rgba(32, 33, 36, 0.28)", // 그림자 효과 추가
            borderRadius: "5px", // 테두리 둥글게
            width: "300px", // 입력 필드 너비
            transition: "all 0.3s", // 부드러운 전환 효과
          }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border border-gray-300">구장명</th>
            <th className="p-2 border border-gray-300">구장 위치</th>
            <th className="p-2 border border-gray-300">사업자명</th>
            <th className="p-2 border border-gray-300">사업자 등록 번호</th>
            <th className="p-2 border border-gray-300">예약 날짜</th>
            <th className="p-2 border border-gray-300">예약 시간</th>
            <th className="p-2 border border-gray-300">예약된 날짜</th>
            <th className="p-2 border border-gray-300">결제 금액</th>
            <th className="p-2 border border-gray-300">고객명</th>
            <th className="p-2 border border-gray-300">이메일</th>
          </tr>
        </thead>
        <tbody>
          {filteredReserveList.map((reserve) => (
            <tr key={reserve.reservaeDate} className="border border-gray-300">
              <td className="p-2 border border-gray-300">
                {reserve.groundName}
              </td>
              <td className="p-2 border border-gray-300">{reserve.addr}</td>
              <td className="p-2 border border-gray-300">
                {reserve.businessId}
              </td>
              <td className="p-2 border border-gray-300">
                {reserve.businessName}
              </td>
              <td className="p-2 border border-gray-300">
                {new Date(reserve.reserveDate).toLocaleDateString()}
              </td>
              <td className="p-2 border border-gray-300">{reserve.time}</td>
              <td className="p-2 border border-gray-300">
                {new Date(reserve.createDate).toLocaleDateString()}
              </td>
              <td className="p-2 border border-gray-300">{reserve.price}</td>
              <td className="p-2 border border-gray-300">{reserve.userName}</td>
              <td className="p-2 border border-gray-300">{reserve.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReserveListPage;
