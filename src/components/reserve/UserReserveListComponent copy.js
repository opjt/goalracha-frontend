import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserReservationStatus, reserveInfo } from "api/reserveApi";
import PageComponent from "components/common/PageComponent";
import useCustomLogin from "hooks/useCustomLogin";
import BasicLayout from "layouts/BasicLayout";
import moment from "moment";

const UserReserveListComponent = () => {
  const [reserveList, setReserveList] = useState([]);
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const [pageData, setPageData] = useState({});
  const { loginState } = useCustomLogin();

  const navigate = useNavigate();

  const movePage = async ({ page }) => {
    setPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 로그인 상태에 따라 API 요청을 보내거나 보내지 않음
        if (loginState.uNo) {
          const reserveData = await getUserReservationStatus(
            { page, size },
            loginState.uNo
          );
          console.log(reserveData);
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

  const changeTimeToString = (time, unit) => {
    var timeList = time.split(",");
    console.log(timeList);
    var timeString;
    if (timeList.length == 1) {
      timeString = `${timeList[0]}:00 ~ ${parseInt(timeList[0]) + unit}:00`;
    } else {
      timeString = `${timeList[0]}:00 ~ ${parseInt(timeList[timeList.length - 1]) + unit}:00`;
    }
    return timeString;
  };

  return (
    <>
      <div class=" max-w-screen-lg mx-auto">
          <div class="  py-4 overflow-x-auto">
            <div class="inline-block min-w-[700px] w-full rounded-lg overflow-hidden">
              <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    구장이름 / 구장주소
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    결제 날짜
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    날짜 / 시간
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                </tr>
              </thead>
              <tbody>
                {reserveList.map((reserve) => (
                  <tr className="text-left">
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                      <div className="flex">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {reserve.groundName}
                          </p>
                          <p className="text-gray-600 whitespace-no-wrap">
                            {reserve.groundAddr}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {moment(reserve.createDate).format("YYYY-MM-DD")}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {moment(reserve.reserveDate).format("YYYY-MM-DD")}
                      </p>
                      <p className="text-gray-600 whitespace-no-wrap">
                        {changeTimeToString(reserve.time, reserve.usageTime)}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {reserve.state === 1 && (
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">결제완료</span>
                        </span>
                      )}
                      {reserve.state === 0 && (
                        <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">환불</span>
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                      <button
                        type="button"
                        className="inline-block text-gray-500 hover:text-gray-700"
                      >
                        <svg
                          className="inline-block h-6 w-6 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    
    </>
  );
};

export default UserReserveListComponent;


  {/* <div className="btn btn-wide" onClick={() => handleTest()}>
                dd
            </div>
            <Link to={{ pathname: '/user/reserve', state: { payKey:"tviva20240320163049noTx9" } }} >워승스</Link> */}

      {/* 페이지네이션 컴포넌트 추가 */}
      {/* {pageData && pageData.pageNumList && pageData.pageNumList.length > 0 && (
                    <PageComponent serverData={pageData} movePage={movePage} />
                )} 
            
              const handleTest = () => {
    var payKey = "tviva20240321102837q8ho0";
    navigate(`/user/reserve`, { state: { payKey: payKey } });
  };
            
            
            
            */}