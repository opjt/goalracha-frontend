import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getUserReservationStatus,reserveInfo } from "api/reserveApi";
import PageComponent from "components/common/pageComPonent";
import { useSelector } from "react-redux";
import BasicLayout from "layouts/BasicLayout";
import moment from "moment";
import Select from 'react-select'
import useCustomLogin from "hooks/useCustomLogin";
import { DateRange } from "react-date-range";
import ko from 'date-fns/locale/ko';	     // 날짜 포맷 라이브러리 (한국어 기능을 임포트)
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const UserReservationStatusPage = () => {
  const [reserveList, setReserveList] = useState([]);
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const [pageData, setPageData] = useState({});
  const { loginState } = useCustomLogin();
  const [datePicker, setDatePicker] = useState([
    {
      startDate: moment().subtract(7,'d').toDate(),
      endDate: moment().add(7,'d').toDate(),
      key: 'selection'
    }
  ]);
  const navigate = useNavigate();
  const options = [
    { value: '전체', label: '전체' },
    { value: '결제완료', label: '결제완료' },
    { value: '예약취소', label: '예약취소' },
    { value: '이용완료', label: '이용완료' }
  ]

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
          
          // console.log(datePicker[0])
          var resDTOlist = reserveData.dtoList
          var filteredData = resDTOlist.filter(item => {
            var reserveDate = moment(item.reserveDate);
            return reserveDate.isSameOrAfter(datePicker[0].startDate) && reserveDate.isSameOrBefore(datePicker[0].endDate);
        });
          setReserveList(filteredData);
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
  }, [page, size, loginState.uNo,datePicker]);

  // useEffect(() => {
  //   console.log(datePicker)
  //   var newReserveList = {reserveList}

  //   console.log(newReserveList)

  
  
  // console.log(filteredData)
  // setReserveList(filteredData)
  // },datePicker )

  const changeTimeToString = (time, unit) => {
    var timeList = time.split(",");
    var timeString;
    if (timeList.length == 1) {
      timeString = `${timeList[0]}:00 ~ ${parseInt(timeList[0]) + unit}:00`;
    } else {
      timeString = `${timeList[0]}:00 ~ ${parseInt(timeList[timeList.length - 1]) + unit}:00`;
    }
    return timeString;
  };
  const handleClick = (payKey) => {
    navigate(`/user/reserve`, { state: { payKey: payKey } });
  };

  return (
    <BasicLayout>
      <div className="p-2">
        <div className="font-semibold text-base mt-3">예약 내역</div>
        
        <div className="flex max-md:flex-col">
          <div className="p-3 flex ">
            {/* <Select className="max-w-36"options={options} defaultValue={{value:'전체',label:'전체'}}/> */}
            <DateRange className="max-md:w-full w-72"
              style={{width:'100%'}} 
              locale={ko} 	// 한국어 달력
              editableDateInputs={true}
              onChange={item => setDatePicker([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={datePicker}
            />
          </div>
          <div className="w-full">
          {reserveList.length == 0 && (
          <div className="p-2 text-center"> 예약 정보가 없습니다</div>
          )}
          {reserveList.map((reserve, index) => (
            <div
              key={index}
              className="border-b-[1px] border-gray-200 p-3 flex justify-between cursor-pointer"
              onClick={() => handleClick(reserve.payKey)}
            >
              <div className="flex flex-col flex-1 min-w-0 whitespace-nowrap">
                <p className="text-md text-ellipsis overflow-hidden ">
                  {reserve.groundName}{" "}
                  <span>
                    [{changeTimeToString(reserve.time, reserve.usageTime)}]
                  </span>
                </p>
                <p className="text-sm text-gray-500 ">{reserve.groundAddr}</p>
              </div>

              <div className="flex justify-between w-1/5 min-w-36 items-center text-sm">
                <div className="">
                  {moment(reserve.reserveDate).format("YYYY-MM-DD")}
                </div>
                <div className="text-nowrap ">
                  {reserve.state === 0 ? (
                    <p className="text-red-500">예약취소</p>
                  ) : moment(reserve.reserveDate).isBefore(
                      moment().subtract(1, "days")
                    ) == true ? (
                    <p className="">이용완료</p>
                  ) : (
                    <p className="text-green-500">결제완료</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
  
            
      </div>
    </BasicLayout>
  );
};

export default UserReservationStatusPage;

{
  /* <div className="btn btn-wide" onClick={() => handleTest()}>
                dd
            </div>
            <Link to={{ pathname: '/user/reserve', state: { payKey:"tviva20240320163049noTx9" } }} >워승스</Link> */
}

{
  /* 페이지네이션 컴포넌트 추가 */
}
{
  /* {pageData && pageData.pageNumList && pageData.pageNumList.length > 0 && (
                    <PageComponent serverData={pageData} movePage={movePage} />
                )} 
            
              const handleTest = () => {
    var payKey = "tviva20240321102837q8ho0";
    navigate(`/user/reserve`, { state: { payKey: payKey } });
  };
            
            
            
            */
}
