import React, { useEffect, useState, useRef } from "react";
import { getOwnerStatistics } from "api/reserveApi";
import { useSelector } from "react-redux";
import BasicLayout from "layouts/BasicLayout";
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer } from 'recharts';
import { DateRangePicker } from 'react-date-range';
import koLocal from 'date-fns/locale/ko';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const OwnerStatisticsPage = () => {
    const [reserveList, setReserveList] = useState([]);
    const loginState = useSelector((state) => state.loginSlice);
    const [grounds, setGrounds] = useState([]);
    const [selectedGround, setSelectedGround] = useState("전체 구장");

    const [selectedDateRange, setSelectedDateRange] = useState([
        {
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
            key: 'selection',
        }
    ]);

    const [showDateRangeModal, setShowDateRangeModal] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const reserveData = await getOwnerStatistics(loginState.uNo);
            setReserveList(reserveData);
            const uniqueGrounds = [...new Set(reserveData.map(reserve => reserve.groundName))];
            setGrounds(["전체 구장", ...uniqueGrounds]);
        } catch (error) {
            console.error("예약 목록을 가져오는 중 오류 발생:", error);
        }
    }

    const prepareChartData = () => {
        const data = [];

        // 필터링된 예약목록 가져오기
        const filteredReserves = reserveList.filter(reserve => {
            const reserveDate = new Date(reserve.reserveDate);
            return reserveDate >= selectedDateRange[0].startDate && reserveDate <= selectedDateRange[0].endDate;
        });

        // 전체 구장인 경우
        if (selectedGround === "전체 구장") {
            grounds.forEach(ground => {
                const filteredGroundReserves = filteredReserves.filter(reserve => reserve.groundName === ground);
                const totalRevenue = filteredGroundReserves.reduce((acc, curr) => acc + curr.price, 0);
                data.push({ groundName: ground, totalRevenue });
            });
        } else {
            // 특정 구장인 경우
            const filteredGroundReserves = filteredReserves.filter(reserve => reserve.groundName === selectedGround);

            // 선택된 날짜 범위 내의 모든 날짜를 생성
            const dateRange = getDates(selectedDateRange[0].startDate, selectedDateRange[0].endDate);

            // 각 날짜별로 일일 매출 데이터가 있는지 확인하고 없으면 0으로 초기화
            dateRange.forEach(date => {
                const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 변환
                const dailyRevenue = filteredGroundReserves
                    .filter(reserve => reserve.reserveDate.split('T')[0] === formattedDate)
                    .reduce((acc, curr) => acc + curr.price, 0);
                data.push({ date: formattedDate, dailyRevenue });
            });
        }

        return data;
    };

    // 선택된 날짜 범위 내의 모든 날짜를 생성하는 함수
    const getDates = (startDate, endDate) => {
        const dates = [];
        let currentDate = new Date(startDate); // 시작일 복제
        const lastDate = new Date(endDate); // 종료일 복제
        while (currentDate <= lastDate) {
            dates.push(new Date(currentDate)); // 복제된 날짜를 추가
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    };

    const handleGroundSelect = (event) => {
        setSelectedGround(event.target.value);
    };

    const toggleDateRangeModal = () => {
        setShowDateRangeModal(!showDateRangeModal);
    };

    useEffect(() => {
        function handleClickOutside(event) {

            if (showDateRangeModal && modalRef.current && !modalRef.current.contains(event.target)) {
                toggleDateRangeModal(); // 모달 닫기
            }
        }


        if (showDateRangeModal) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDateRangeModal]);

    const handleDateRangeSelect = (ranges) => {
        const { startDate, endDate } = ranges.selection;
        if (startDate && endDate && startDate !== endDate) {
            setSelectedDateRange([ranges.selection]);
            toggleDateRangeModal(); // 모달 닫기
        } else {
            setSelectedDateRange([ranges.selection]);
        }
    };

    const formatRevenue = (value) => {
        return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value);
    };

    return (
        <BasicLayout>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-lg font-semibold border-b border-gray-300 mb-4 pb-2">통계 관리</h2>

                <div className="flex items-center mb-4">
                    <label className="mr-2">구장 이름:</label>
                    <select className="border border-gray-300 px-2 py-1 rounded-md" onChange={handleGroundSelect}>
                        {grounds.map((ground, index) => (
                            <option key={index} value={ground}>{ground}</option>
                        ))}
                    </select>
                    {selectedGround !== "전체 구장" && (
                        <>
                            <button className="border border-gray-300 px-2 py-1 rounded-md">
                                일매출
                            </button>
                            <button className="border border-gray-300 px-2 py-1 rounded-md">
                                월매출
                            </button>
                        </>
                    )}
                </div>

                <div className="mb-4">
                    <label className="mr-2">날짜 범위 선택:</label>
                    <button className="border border-gray-300 px-2 py-1 rounded-md" onClick={toggleDateRangeModal}>
                        {selectedDateRange[0].startDate ? `${selectedDateRange[0].startDate.toLocaleDateString()} - ${selectedDateRange[0].endDate ? selectedDateRange[0].endDate.toLocaleDateString() : "날짜 선택"}` : "날짜 선택"}
                    </button>
                    {showDateRangeModal && (
                        <div className="absolute z-10 bg-white p-4 shadow-lg rounded-lg">
                            <DateRangePicker
                                dataFormat='yyyy-MM-dd'
                                ranges={selectedDateRange}
                                onChange={handleDateRangeSelect}
                                locale={koLocal}
                                editableDateInputs={true}
                                rangeColors={["#3aafa9"]}
                            />
                        </div>
                    )}
                </div>

                <div style={{ width: '100%', height: 500 }}>
                    <ResponsiveContainer>
                        <AreaChart data={prepareChartData()}>
                            <defs>
                                <linearGradient id="colorReservations" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            {selectedGround === "전체 구장" ? (
                                <>
                                    <XAxis dataKey="groundName" />
                                    <YAxis dataKey="totalRevenue" tickFormatter={formatRevenue} />
                                </>
                            ) : (
                                <>
                                    <XAxis dataKey="date" />
                                    <YAxis dataKey="dailyRevenue" tickFormatter={formatRevenue} />
                                </>
                            )}
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip formatter={(value) => formatRevenue(value)} />
                            <Area type="monotone" dataKey={selectedGround === "전체 구장" ? "totalRevenue" : "dailyRevenue"} stroke="#8884d8" fillOpacity={1} fill="url(#colorReservations)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </BasicLayout>
    );
};

export default OwnerStatisticsPage;