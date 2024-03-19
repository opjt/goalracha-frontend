import React, { useEffect, useState } from "react";
import { getAllReserveList } from "api/reserveApi";
import PageComponent from "components/common/pageComponent";
import BasicLayout from "layouts/BasicLayout";

const AdminReserveListPage = () => {
    const [reserveList, setReserveList] = useState([]); // 예약 목록 상태 설정
    const [page, setPage] = useState(1); // 페이지 상태 설정
    const [size] = useState(10); // 페이지 크기 상수 설정
    const [pageData, setPageData] = useState({}); // 페이지 데이터 상태 설정

    // 페이지 이동 함수 정의
    const movePage = async ({ page }) => {
        setPage(page); // 페이지 상태 업데이트
    };

    // 페이지 로드 시 예약 목록 및 페이지 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const reserveData = await getAllReserveList({ page, size }); // 예약 목록 가져오기
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

    // 예약 목록 표시
    return (
        <BasicLayout>

            <div className="container mx-auto px-4 py-8">
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
                        {reserveList.map((reserve) => (
                            <tr key={reserve.reservaeDate} className="border border-gray-300">
                                <td className="p-2 border border-gray-300">{reserve.groundName}</td>
                                <td className="p-2 border border-gray-300">{reserve.addr}</td>
                                <td className="p-2 border border-gray-300">{reserve.businessId}</td>
                                <td className="p-2 border border-gray-300">{reserve.businessName}</td>
                                <td className="p-2 border border-gray-300">{new Date(reserve.reserveDate).toLocaleDateString()}</td>
                                <td className="p-2 border border-gray-300">{reserve.time}</td>
                                <td className="p-2 border border-gray-300">{new Date(reserve.createDate).toLocaleDateString()}</td>
                                <td className="p-2 border border-gray-300">{reserve.price}</td>
                                <td className="p-2 border border-gray-300">{reserve.userName}</td>
                                <td className="p-2 border border-gray-300">{reserve.email}</td>
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

export default AdminReserveListPage;