import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUserPreviousReservations } from "api/reserveApi";
import PageComponent from "components/common/pageComponent";
import { useSelector } from "react-redux";
import BasicLayout from "layouts/BasicLayout";

const UserPreviousReservationsPage = () => {
    const [reserveList, setReserveList] = useState([]);
    const [page, setPage] = useState(1);
    const [size] = useState(10);
    const [pageData, setPageData] = useState({});
    const loginState = useSelector((state) => state.loginSlice);

    const movePage = async ({ page }) => {
        setPage(page);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 로그인 상태에 따라 API 요청을 보내거나 보내지 않음
                if (loginState.uNo) {
                    const reserveData = await getUserPreviousReservations({ page, size }, loginState.uNo);
                    setReserveList(reserveData.dtoList);
                    setPageData(reserveData);
                }
            } catch (error) {
                console.error("Error fetching reservation list:", error);
            }
        };
        fetchData();

        return () => {
            setReserveList([]);
        };
    }, [page, size, loginState.uNo]);

    return (
        <BasicLayout>

            <div className="container mx-auto px-4 py-8">
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2 border border-gray-300">구장명</th>
                            <th className="p-2 border border-gray-300">구장 위치</th>
                            <th className="p-2 border border-gray-300">예약 날짜</th>
                            <th className="p-2 border border-gray-300">예약 시간</th>
                            <th className="p-2 border border-gray-300">예약된 날짜</th>
                            <th className="p-2 border border-gray-300">결제 금액</th>

                        </tr>
                    </thead>
                    <tbody>
                        {reserveList.map((reserve) => (
                            <tr key={reserve.reservationDate} className="border border-gray-300">
                                <td className="p-2 border border-gray-300">{reserve.groundName}</td>
                                <td className="p-2 border border-gray-300">{reserve.groundAddr}</td>
                                <td className="p-2 border border-gray-300">{new Date(reserve.reserveDate).toLocaleDateString()}</td>
                                <td className="p-2 border border-gray-300">{reserve.time}</td>
                                <td className="p-2 border border-gray-300">{new Date(reserve.createDate).toLocaleDateString()}</td>
                                <td className="p-2 border border-gray-300">{reserve.price}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* 페이지네이션 컴포넌트 추가 */}
                {pageData && pageData.pageNumList && pageData.pageNumList.length > 0 && (
                    <PageComponent serverData={pageData} movePage={movePage} />
                )}
            </div>

        </BasicLayout>
    );
};

export default UserPreviousReservationsPage;
