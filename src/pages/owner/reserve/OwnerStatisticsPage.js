import React, { useEffect, useState, useRef } from "react";
import { getOwnerStatistics } from "api/reserveApi";
import { useSelector } from "react-redux";
import BasicLayout from "layouts/OwnerLayout";
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer } from 'recharts';
import { DateRange } from "react-date-range";
import ko from 'date-fns/locale/ko';	     // 날짜 포맷 라이브러리 (한국어 기능을 임포트)
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file


const OwnerStatisticsPage = () => {
    const [reserveList, setReserveList] = useState([]);
    const loginState = useSelector((state) => state.loginSlice);
    const [grounds, setGrounds] = useState([]);
    const [selectedGround, setSelectedGround] = useState("전체 구장");
    const [viewMode, setViewMode] = useState("daily");
    const [showDateRangeModal, setShowDateRangeModal] = useState(false);
    const modalRef = useRef(null);


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
        fetchData(); // 구장이 변경될 때마다 데이터 다시 가져오기
    };

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

    const [selectedDateRange, setSelectedDateRange] = useState([
        {
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
            key: 'selection',
        }
    ]);


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

            // 선택된 날짜 범위 내의 모든 날짜를 생성 (이전 날짜부터 시작)
            const dateRange = getDates(selectedDateRange[0].startDate, selectedDateRange[0].endDate);

            // 각 날짜별로 일일 매출 데이터가 있는지 확인하고 없으면 0으로 초기화
            dateRange.forEach(date => {
                const year = date.getFullYear(); // 날짜의 연도를 가져옴
                const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1 해줌
                const dayOfMonth = date.getDate(); // 날짜의 일(day)을 가져옴
                const formattedDate = `${year}-${month}-${dayOfMonth}`; // 년월일 형식으로 조합
                const dailyRevenue = filteredGroundReserves
                    .filter(reserve => {
                        const reserveDate = new Date(reserve.reserveDate);
                        return reserveDate.getDate() === dayOfMonth; // 해당 일에 예약된 데이터만 필터링
                    })
                    .reduce((acc, curr) => acc + curr.price, 0);
                data.push({ date: formattedDate, dailyRevenue }); // 날짜 대신에 년월일을 그래프에 추가
            });
        }
        return data;
    };

    const toggleDateRangeModal = () => {
        setShowDateRangeModal(!showDateRangeModal);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            // 모달이 열려 있고, 모달 래퍼 엘리먼트가 존재하며, 클릭된 엘리먼트가 모달 밖에 있는 경우 모달을 닫습니다.
            if (showDateRangeModal && modalRef.current && !modalRef.current.contains(event.target)) {
                toggleDateRangeModal(); // 모달 닫기
            }
        }
        // 모달이 열려 있을 때만 외부 클릭 이벤트를 추가합니다.
        if (showDateRangeModal) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            // 모달이 닫혔을 때는 외부 클릭 이벤트를 제거합니다.
            document.removeEventListener("mousedown", handleClickOutside);
        }

        // 컴포넌트가 언마운트될 때 외부 클릭 이벤트를 정리합니다.
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDateRangeModal]);

    const handleDateRangeSelect = (ranges) => {
        const { startDate, endDate } = ranges.selection;
        if (startDate && endDate && startDate !== endDate) {
            setSelectedDateRange([{ startDate, endDate, key: 'selection' }]);
            toggleDateRangeModal(); // 모달 닫기
            fetchData(); // 데이터 다시 가져오기
        } else {
            setSelectedDateRange([{ startDate, endDate, key: 'selection' }]);
        }
    };

    const formatRevenue = (value) => {
        return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value);
    };

    const handleViewModeChange = (mode) => {
        setViewMode(mode);
    };

    const handleMonthlyRevenue = () => {
        const year = new Date().getFullYear(); // 현재 연도 가져오기
        setSelectedDateRange([
            {
                startDate: new Date(year, 0, 1), // 해당 연도의 1월 1일
                endDate: new Date(year, 11, 31), // 해당 연도의 12월 31일
                key: 'selection',
            }
        ]);
        handleViewModeChange("monthly"); // 뷰 모드 변경
        fetchData(); // 월매출 클릭 시 데이터 다시 가져오기
    };

    const handleTimeSlotRevenue = () => {
        setViewMode("timeSlot"); // 시간대별 모드로 변경
    };

    const prepareTimeSlotChartData = () => {
        const data = [];
        // 필터링된 예약목록 가져오기
        const filteredReserves = reserveList.filter(reserve => {
            const reserveDate = new Date(reserve.reserveDate);
            return reserveDate >= selectedDateRange[0].startDate && reserveDate <= selectedDateRange[0].endDate;
        });

        // 전체 구장인 경우
        if (selectedGround === "전체 구장") {
            // 모든 시간대를 초기화하여 0으로 설정
            const allTimes = Array.from({ length: 30 }, (_, index) => {
                const hour = (index + 6) % 24; // 06부터 시작하고 24 넘어가면 다시 06부터 시작하도록 설정
                const formattedHour = hour < 10 ? '0' + hour : hour; // 두 자리로 표현
                return { time: `${formattedHour}:00`, reservationCount: 0 }; // 시간대 표시를 변경
            });

            // 예약된 시간대에 예약 횟수를 더함
            filteredReserves.forEach(reserve => {
                const reserveTime = reserve.time; // 시간만 추출
                const usageTime = reserve.usageTime; // 사용 시간 가져오기
                for (let i = reserveTime; i < reserveTime + usageTime; i++) {
                    allTimes[i % 30].reservationCount += 1; // 시간이 30을 넘어가는 경우를 고려하여 나머지 연산
                }
            });
            data.push(...allTimes);
        } else {
            // 특정 구장인 경우
            const filteredGroundReserves = filteredReserves.filter(reserve => reserve.groundName === selectedGround);

            // 각 시간대별로 예약된 횟수를 계산하여 저장
            for (let hour = 6; hour <= 29; hour++) {
                const reservationCount = filteredGroundReserves.filter(reserve => {
                    const reserveTime = parseInt(reserve.time); // 시간만 추출
                    const usageTime = reserve.usageTime;
                    return reserveTime <= hour && hour < reserveTime + usageTime;
                }).length;
                const formattedHour = hour < 10 ? '0' + hour : hour; // 두 자리로 표현
                data.push({ time: `${formattedHour}:00`, reservationCount }); // 시간대 표시를 변경
            }
        }
        return data;
    };

    const prepareMonthlyChartData = () => {
        const monthlyData = {};

        // 필터링된 예약목록 가져오기
        const filteredReserves = reserveList.filter(reserve => {
            const reserveDate = new Date(reserve.reserveDate);
            return reserveDate >= selectedDateRange[0].startDate && reserveDate <= selectedDateRange[0].endDate;
        });

        // 선택된 구장인 경우 해당 구장의 데이터만 고려
        const filteredGroundReserves = selectedGround === "전체 구장" ? filteredReserves : filteredReserves.filter(reserve => reserve.groundName === selectedGround);

        // 모든 월을 초기화하여 0으로 설정
        const allMonths = Array.from({ length: 12 }, (_, index) => {
            const monthYear = new Date(selectedDateRange[0].startDate.getFullYear(), index).toLocaleString('default', { month: 'long', year: 'numeric' });
            return { month: monthYear, totalRevenue: 0 };
        });

        // 예약 데이터가 있는 월의 매출을 계산하여 저장
        filteredGroundReserves.forEach(reserve => {
            const reserveDate = new Date(reserve.reserveDate);
            const monthYear = reserveDate.toLocaleString('default', { month: 'long', year: 'numeric' });
            if (!monthlyData[monthYear]) {
                monthlyData[monthYear] = 0;
            }
            monthlyData[monthYear] += reserve.price;
        });

        // 모든 월의 데이터를 반환하되, 해당 범위 내에 데이터가 없는 경우 0으로 설정
        const data = allMonths.map(monthData => ({
            ...monthData,
            totalRevenue: monthlyData[monthData.month] || 0 // 해당 월의 매출이 없으면 0으로 설정
        }));

        return data;
    };



    const handleDailyRevenue = () => {
        setViewMode("daily"); // 일매출 모드로 변경
        const currentDate = new Date(); // 현재 날짜 가져오기
        const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // 현재 월의 1일로 시작일 설정
        const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); // 현재 월의 마지막 날로 종료일 설정
        setSelectedDateRange([
            {
                startDate,
                endDate,
                key: 'selection',
            }
        ]);
    };

    const maxRevenue = Math.max(...prepareMonthlyChartData().map(dataPoint => dataPoint.totalRevenue));
    const maxReservationCount = Math.max(...prepareTimeSlotChartData().map(dataPoint => dataPoint.reservationCount));
    const maxReservationCountCeiled = Math.ceil(maxReservationCount * 1.2);


    return (
        <>  <div className="border mx-auto mt-10 mb-10 border-gray-300 rounded-box p-5">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center mb-4">
                    <label className="mr-2">구장 이름:</label>
                    <select className="border border-gray-300 px-2 py-1 rounded-md" onChange={handleGroundSelect}>
                        {grounds.map((ground, index) => (
                            <option key={index} value={ground}>{ground}</option>
                        ))}
                    </select>

                    {selectedGround !== "전체 구장" && (
                        <>
                            <button className={`border border-gray-300 px-2 py-1 ml-4 rounded-md ${viewMode === 'daily' && 'bg-gray-300'}`} onClick={handleDailyRevenue}>
                                일매출
                            </button>
                            <button className={`border border-gray-300 px-2 py-1 ml-4 rounded-md ${viewMode === 'monthly' && 'bg-gray-300'}`} onClick={handleMonthlyRevenue}>
                                월매출
                            </button>
                            <button className={`border border-gray-300 px-2 py-1 ml-4 rounded-md ${viewMode === 'timeSlot' && 'bg-gray-300'}`} onClick={handleTimeSlotRevenue}>
                                시간대별
                            </button>
                        </>
                    )}
                    {selectedGround == "전체 구장" && (
                        <>
                            <button className={`border border-gray-300 px-2 py-1 ml-4 rounded-md ${viewMode === 'daily' && 'bg-gray-300'}`} onClick={handleDailyRevenue}>
                                구장별매출
                            </button>
                            <button className={`border border-gray-300 px-2 py-1 ml-4 rounded-md ${viewMode === 'monthly' && 'bg-gray-300'}`} onClick={handleMonthlyRevenue}>
                                구장총매출
                            </button>
                            <button className={`border border-gray-300 px-2 py-1 ml-4 rounded-md ${viewMode === 'timeSlot' && 'bg-gray-300'}`} onClick={handleTimeSlotRevenue}>
                                시간대별
                            </button>
                        </>
                    )}
                </div>

                <div className="mb-4">
                    <label className="mr-2">날짜 범위 선택:</label>
                    <button className="border border-gray-300 px-2 py-1 rounded-md" onClick={toggleDateRangeModal}>
                        {selectedDateRange[0].startDate ? `${selectedDateRange[0].startDate.toLocaleDateString('ko-KR')} - ${selectedDateRange[0].endDate ? selectedDateRange[0].endDate.toLocaleDateString('ko-KR') : "날짜 선택"}` : "날짜 선택"}
                    </button>
                    {showDateRangeModal && (
                        <div className="absolute z-10 bg-white p-4 shadow-lg rounded-lg">
                            <DateRange
                                dateDisplayFormat="yyyy-mm.dd" // 날짜 포맷값
                                ranges={selectedDateRange}
                                onChange={handleDateRangeSelect}
                                locale={ko}
                                editableDateInputs={true}
                                rangeColors={["#3aafa9"]}
                                moveRangeOnFirstSelection={false}
                            />
                        </div>
                    )}
                </div>

                <div style={{ width: '100%', height: 650 }}>
                    <ResponsiveContainer>
                        {viewMode === "monthly" ? (
                            <AreaChart data={prepareMonthlyChartData()}>
                                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                                <YAxis dataKey="totalRevenue" tickFormatter={formatRevenue} domain={[0, maxRevenue * 1.2]}
                                    tick={{ fontSize: 12 }} />
                                <CartesianGrid strokeDasharray="0" />
                                <Tooltip
                                    formatter={(value, name, props) => {
                                        return [`매출액: ${formatRevenue(value)}`];
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="totalRevenue"
                                    stroke="#3aafa9"
                                    fillOpacity={0.6}
                                    fill="url(#colorReservations)"
                                    isAnimationActive={true}
                                    strokeWidth={3}
                                    dot={{ fill: '#3aafa9', strokeWidth: 2, radius: 5 }} // 점의 스타일 설정
                                />
                            </AreaChart>
                        ) : (
                            viewMode === "timeSlot" ? (
                                <AreaChart data={prepareTimeSlotChartData()}>
                                    <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                                    <YAxis dataKey="reservationCount" domain={[0, maxReservationCountCeiled]}
                                        tick={{ fontSize: 12 }} />                                    <CartesianGrid strokeDasharray="0" />
                                    <Tooltip
                                        formatter={(value, name, props) => {
                                            return [`예약 횟수: ${value}`];
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="reservationCount"
                                        stroke="#3aafa9"
                                        fillOpacity={0.6}
                                        fill="url(#colorReservations)"
                                        isAnimationActive={true}
                                        strokeWidth={3}
                                        dot={{ fill: '#3aafa9', strokeWidth: 2, radius: 5 }} // 점의 스타일 설정
                                    />
                                </AreaChart>
                            ) : (
                                selectedGround === "전체 구장" ? (
                                    <AreaChart data={prepareChartData()}>
                                        <XAxis dataKey="groundName" tick={{ fontSize: 12 }} />
                                        <YAxis dataKey="totalRevenue" tickFormatter={formatRevenue}
                                            tick={{ fontSize: 12 }} /*domain={[0, maxRevenue * 1.2] }*/ />
                                        <CartesianGrid strokeDasharray="0" />
                                        <Tooltip
                                            formatter={(value, name, props) => {
                                                return [`매출액: ${formatRevenue(value)}`];
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="totalRevenue"
                                            stroke="#3aafa9"
                                            fillOpacity={0.6}
                                            fill="url(#colorReservations)"
                                            isAnimationActive={true}
                                            strokeWidth={3}
                                            dot={{ fill: '#3aafa9', strokeWidth: 2, radius: 5 }} // 점의 스타일 설정
                                        />
                                    </AreaChart>
                                ) : (
                                    <AreaChart data={prepareChartData()}>
                                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                                        <YAxis dataKey="dailyRevenue" tickFormatter={formatRevenue} domain={[0, maxRevenue * 1.2]}
                                            tick={{ fontSize: 12 }} />
                                        <CartesianGrid strokeDasharray="0" />
                                        <Tooltip
                                            formatter={(value, name, props) => {
                                                return [`매출액: ${formatRevenue(value)}`];
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="dailyRevenue"
                                            stroke="#3aafa9"
                                            fillOpacity={0.6}
                                            fill="url(#colorReservations)"
                                            isAnimationActive={true}
                                            strokeWidth={3}
                                            dot={{ fill: '#3aafa9', strokeWidth: 2, radius: 5 }} // 점의 스타일 설정

                                        />
                                    </AreaChart>
                                )
                            )
                        )}
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
        </>
    );
};

export default OwnerStatisticsPage;