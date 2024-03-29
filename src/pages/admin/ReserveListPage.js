import React, { useEffect, useState } from "react";
import { getAllReserveList } from "api/reserveApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReserveListPage = () => {
  const [reserveList, setReserveList] = useState([]); // 예약 목록 상태 설정
  const [page, setPage] = useState(1); // 페이지 상태 설정
  const [size] = useState(10); // 페이지 크기 상수 설정
  const [pageData, setPageData] = useState({}); // 페이지 데이터 상태 설정
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(null); // 초기값을 null로 설정
  const [endDate, setEndDate] = useState(null); // 초기값을 null로 설정

  // 페이지 로드 시 예약 목록 및 페이지 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const reserveData = await getAllReserveList({ page: 1, size: 10000 });
        console.log("Received reserve data:", reserveData);
        setReserveList(reserveData.dtoList);
      } catch (error) {
        console.error("Error fetching reservation list:", error);
      }
    };
    fetchData();
  }, []); // 페이지가 로드될 때 한 번만 데이터를 가져옴

  // 필터링된 예약 목록을 계산하는 로직
  const filteredReserveList = reserveList.filter((reserve) => {
    const reserveDate = new Date(reserve.reserveDate);
    const meetsDateCriteria = (!startDate || reserveDate >= startDate) && (!endDate || reserveDate <= endDate);
    const meetsSearchCriteria = reserve.groundName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reserve.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reserve.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reserve.email.toLowerCase().includes(searchTerm.toLowerCase());

    return meetsDateCriteria && meetsSearchCriteria;
  });


  // 예약 목록 표시
  return (
    <div className="container mx-auto mt-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">예약 리스트(DB 연동)</h2>
        <div className="flex items-center space-x-2">
          {/* 상세 검색 텍스트 */}
          <span className="text-2xl font-bold">상세검색</span>
          {/* 시작 날짜 선택기 */}
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            isClearable={true} // 날짜 선택 취소 가능
            placeholderText="시작 날짜 선택"
            style={{
              padding: "10px",
              fontSize: "1rem",
              border: "2px solid #4A90E2", // 검색창과 동일한 테두리 색상
              boxShadow: "0 4px 6px rgba(32, 33, 36, 0.28)", // 동일한 그림자 효과
              borderRadius: "5px", // 동일한 둥근 모서리
              width: "auto", // 자동 너비 조정
              cursor: "pointer", // 마우스 오버 시 포인터 커서 표시
            }}
          />
          {/* 종료 날짜 선택기 */}
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            isClearable={true} // 날짜 선택 취소 가능
            placeholderText="종료 날짜 선택"
            style={{
              padding: "8px",
              border: "2px solid #ddd", // 테두리 추가
              borderRadius: "5px", // 둥근 테두리
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // 그림자 효과
            }}
          />
          {/* 검색창 */}
          <input
            type="text"
            placeholder="예약 검색..."
            style={{
              padding: "10px",
              fontSize: "1rem",
              border: "2px solid #4A90E2",
              boxShadow: "0 4px 6px rgba(32, 33, 36, 0.28)",
              borderRadius: "5px",
              transition: "all 0.3s",
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border border-gray-300">구장명</th>
            <th className="p-2 border border-gray-300">구장 위치</th>
            <th className="p-2 border border-gray-300">사업자 등록 번호</th>
            <th className="p-2 border border-gray-300">사업자명</th>
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
                {new Date(reserve.reserveDate).toISOString().split('T')[0]}
              </td>
              <td className="p-2 border border-gray-300">
                {`${reserve.time < 10 ? '0' + reserve.time : reserve.time}:00 ~ ${reserve.time + reserve.usageTime < 10 ? '0' + (reserve.time + reserve.usageTime) : reserve.time + reserve.usageTime}:00`}
              </td>
              <td className="p-2 border border-gray-300">
                {new Date(reserve.createDate).toISOString().split('T')[0]}
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
