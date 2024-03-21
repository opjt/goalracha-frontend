import React, { useEffect, useState } from "react";
import { getOwnerReserveList } from "api/reserveApi";
import { useSelector } from "react-redux";
import BasicLayout from "layouts/BasicLayout";
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer } from 'recharts';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const OwnerStatisticsPage = () => {
    const [reserveList, setReserveList] = useState([]);
    const loginState = useSelector((state) => state.loginSlice);
    const [grounds, setGrounds] = useState([]);
    const [selectedGround, setSelectedGround] = useState("전체 구장");
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            let allReserves = [];
            let currentPage = 1;
            let totalPages = 1;

            while (currentPage <= totalPages) {
                const reserveData = await getOwnerReserveList({ page: currentPage, size: 10 }, loginState.uNo);
                allReserves = [...allReserves, ...reserveData.dtoList];
                totalPages = reserveData.totalPages;
                currentPage++;
            }

            setReserveList(allReserves);
            const uniqueGrounds = [...new Set(allReserves.map(reserve => reserve.groundName))];
            setGrounds(["전체 구장", ...uniqueGrounds]);
        } catch (error) {
            console.error("Error fetching reservation list:", error);
        }
    };

    const prepareChartData = () => {
        const data = [];

        if (selectedGround === "전체 구장") {
            grounds.forEach(ground => {
                const filteredReserves = reserveList.filter(reserve => reserve.groundName === ground);
                const totalRevenue = filteredReserves.reduce((acc, curr) => acc + curr.price, 0);
                data.push({ groundName: ground, totalRevenue });
            });
        } else {
            const filteredReserves = reserveList.filter(reserve => reserve.groundName === selectedGround);
            const totalRevenue = filteredReserves.reduce((acc, curr) => acc + curr.price, 0);
            data.push({ groundName: selectedGround, totalRevenue });
        }

        return data;
    };

    const handleGroundSelect = (event) => {
        setSelectedGround(event.target.value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
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
                </div>

                <div className="mb-4">
                    <label className="mr-2">날짜 선택:</label>
                    <Calendar
                        date={selectedDate}
                        onChange={handleDateChange}
                    />
                </div>

                <div style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer>
                        <AreaChart data={prepareChartData()}>
                            <defs>
                                <linearGradient id="colorReservations" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="groundName" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Area type="monotone" dataKey="totalRevenue" stroke="#8884d8" fillOpacity={1} fill="url(#colorReservations)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </BasicLayout>
    );
};

export default OwnerStatisticsPage;
