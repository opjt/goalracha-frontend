import React, { useEffect, useState } from "react";
import { getOwnerReserveListSearch } from "api/reserveApi";
import { getOwnerReserveList } from "api/reserveApi";
import PageComponent from "components/common/pageComPonent";
import { useSelector } from "react-redux";
import BasicLayout from "layouts/OwnerLayout";
import {
    AreaChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Area,
    ResponsiveContainer,
} from "recharts";

const OwnerReserveListPage = () => {
    const [reserveList, setReserveList] = useState([]);
    const [page, setPage] = useState(1);
    const [size] = useState(10);
    const [pageData, setPageData] = useState({});
    const [searchName, setSearchName] = useState("");
    const loginState = useSelector((state) => state.loginSlice);

    const movePage = async ({ page }) => {
        setPage(page);
    };

    const handleSearch = async () => {
        try {
            if (loginState.uNo) {
                const reserveData = await getOwnerReserveListSearch(
                    { page, size, searchName },
                    loginState.uNo,
                    searchName
                );
                setReserveList(reserveData.dtoList);
                setPageData(reserveData);
                window.scrollTo(0, 0);
            }
        } catch (error) {
            console.error("Error fetching reservation list:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, size, loginState.uNo, searchName]);

    const fetchData = async () => {
        try {
            if (loginState.uNo) {
                const reserveData = await getOwnerReserveList(
                    { page, size },
                    loginState.uNo
                );
                setReserveList(reserveData.dtoList);
                setPageData(reserveData);
                window.scrollTo(0, 0);
            }
        } catch (error) {
            console.error("Error fetching reservation list:", error);
        }
    };

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-lg font-semibold border-b border-gray-300 mb-4 pb-2">
                    예약 내역
                </h2>
                <div className="mb-4">
                    <input
                        type="text"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        placeholder="검색어를 입력하세요"
                        className="border border-gray-300 px-2 py-1 rounded-md"
                    />
                    <button
                        onClick={handleSearch}
                        className="ml-2 bg-blue-500 text-white px-4 py-1 rounded-md"
                    >
                        검색
                    </button>
                </div>
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2 border border-gray-300">구장명</th>
                            <th className="p-2 border border-gray-300">구장 위치</th>
                            <th className="p-2 border border-gray-300">예약 날짜</th>
                            <th className="p-2 border border-gray-300">예약 시간</th>
                            <th className="p-2 border border-gray-300">예약된 날짜</th>
                            <th className="p-2 border border-gray-300">결제 금액</th>
                            <th className="p-2 border border-gray-300">고객명</th>
                            <th className="p-2 border border-gray-300">고객 이메일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reserveList.map((reserve) => (
                            <tr
                                key={reserve.rNo}
                                className="border border-gray-300"
                            >
                                <td className="p-2 border border-gray-300">
                                    {reserve.groundName}
                                </td>
                                <td className="p-2 border border-gray-300">
                                    {reserve.addr}
                                </td>
                                <td className="p-2 border border-gray-300">
                                    {new Date(
                                        reserve.reserveDate
                                    ).toLocaleDateString()}
                                </td>
                                <td className="p-2 border border-gray-300">
                                    {reserve.time}
                                </td>
                                <td className="p-2 border border-gray-300">
                                    {new Date(
                                        reserve.createDate
                                    ).toLocaleDateString()}
                                </td>
                                <td className="p-2 border border-gray-300">
                                    {reserve.price}
                                </td>
                                <td className="p-2 border border-gray-300">
                                    {reserve.userName}
                                </td>
                                <td className="p-2 border border-gray-300">
                                    {reserve.email}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {pageData &&
                pageData.pageNumList &&
                pageData.pageNumList.length > 0 && (
                    <PageComponent
                        serverData={pageData}
                        movePage={movePage}
                    />
                )}
            </div>
        </>
    );
};

export default OwnerReserveListPage;
