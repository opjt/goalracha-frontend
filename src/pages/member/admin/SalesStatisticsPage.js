import axios from "axios";
import React, { useState, useEffect } from "react";
import SalesStatistics from "./SalesStatistics";

const SalesStatisticsPage = () => {
  const [dailySales, setDailySales] = useState([]);
  const [filterYear, setFilterYear] = useState(new Date().getFullYear()); // 현재 년도로 초기화
  const [filterMonth, setFilterMonth] = useState(new Date().getMonth() + 1); // 현재 월로 초기화

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/reserve/v/list")
      .then((response) => {
        const reserves = response.data.dtoList;
        const salesData = {};

        reserves.forEach((reserve) => {
          const date = new Date(reserve.reserveDate);
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const dateString = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

          if (year === filterYear && month === filterMonth) {
            salesData[dateString] = (salesData[dateString] || 0) + reserve.price;
          }
        });

        const sortedDates = Object.keys(salesData).sort();
        const formattedData = sortedDates.map(date => ({
          date,
          totalSales: salesData[date],
        }));

        setDailySales(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching reservation data:", error);
      });
  }, [filterYear, filterMonth]);

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
