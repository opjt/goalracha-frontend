import axios from "axios";
import React, { useState, useEffect } from "react";
import SalesStatistics from "./SalesStatistics";
import { getAllReserveList } from "api/reserveApi";

const SalesStatisticsPage = () => {
  const [dailySales, setDailySales] = useState([]);
  const [filterYear, setFilterYear] = useState(new Date().getFullYear()); // 현재 년도로 초기화
  const [filterMonth, setFilterMonth] = useState(new Date().getMonth() + 1); // 현재 월로 초기화

  useEffect(() => {
    const fetchData = async () => {
      try {
        // getAllReserveList 함수를 사용하여 전체 예약 목록을 가져옵니다.
        const response = await getAllReserveList({ page: 1, size: 10000 });
        const reserves = response.dtoList;
        const salesData = {};

        reserves.forEach((reserve) => {
          const date = new Date(reserve.reserveDate);
          const year = date.getFullYear();
          const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.
          const day = date.getDate(); // 일자 추출
          const dateString = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`; // "YYYY-MM-DD" 형식으로 변환

          // 선택한 년도와 월에 해당하는 데이터만 집계
          if (year === filterYear && month === filterMonth) {
            salesData[dateString] = (salesData[dateString] || 0) + reserve.price; // 해당 날짜의 매출 합계 업데이트
          }
        });

        // salesData 객체를 날짜 순서대로 정렬하여 배열로 변환
        const sortedDates = Object.keys(salesData).sort();
        const formattedData = sortedDates.map(date => ({
          date,
          totalSales: salesData[date],
        }));

        setDailySales(formattedData);
      } catch (error) {
        console.error("Error fetching reservation data:", error);
      }
    };

    fetchData();
  }, [filterYear, filterMonth]); // filterYear, filterMonth가 변경될 때마다 fetchData 함수 재실행

  // 년도와 월 선택 핸들러
  const handleYearChange = (event) => {
    setFilterYear(parseInt(event.target.value, 10));
  };

  const handleMonthChange = (event) => {
    setFilterMonth(parseInt(event.target.value, 10));
  };

  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-2xl font-bold mb-5">매출 통계 (DB연동)</h2>
      {/* 년도 선택 */}
      <select
        onChange={handleYearChange}
        value={filterYear}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          margin: "5px",
          borderRadius: "5px",
          border: "1px solid #ddd",
          boxShadow: "0px 0px 5px rgba(0,0,0,0.1)",
          cursor: "pointer",
        }}
      >
        {/* 예시로 몇 개의 년도만 추가함. 필요에 따라 동적으로 생성 */}
        <option value={2023}>2023</option>
        <option value={2024}>2024</option>
        <option value={2025}>2025</option>
      </select>
      {/* 월 선택 */}
      <select
        onChange={handleMonthChange}
        value={filterMonth}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          margin: "5px",
          borderRadius: "5px",
          border: "1px solid #ddd",
          boxShadow: "0px 0px 5px rgba(0,0,0,0.1)",
          cursor: "pointer",
        }}
      >
        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
          <option key={month} value={month}>
            {month}월
          </option>
        ))}
      </select>
      <SalesStatistics dailySales={dailySales} />
    </div>
  );
};

export default SalesStatisticsPage;
