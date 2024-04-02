import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserReservationStatus,reserveInfo } from "api/reserveApi";
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
  const [stateFilter, setStateFilter] = useState("전체");
  const { loginState } = useCustomLogin();
  const [datePicker, setDatePicker] = useState([
    {
      startDate: moment().subtract(14,'d').toDate(),
      endDate: moment().add(14,'d').toDate(),
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


  const handleSelectChange = (e) => {
    setStateFilter(e.value)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 로그인 상태에 따라 API 요청을 보내거나 보내지 않음
        if (loginState.uNo) {
          const reserveData = await getUserReservationStatus(
            { page:1, size:99999 },
            loginState.uNo
          );
          
          // console.log(datePicker[0])
          var resDTOlist = reserveData.dtoList
          for(var key in resDTOlist) {
            resDTOlist[key].showState = "결제완료"
            if(moment(resDTOlist[key].reserveDate).isBefore(moment().subtract(1, "days"))) {
              resDTOlist[key].showState = "이용완료";
            }
            if(resDTOlist[key].state === 0) {
              resDTOlist[key].showState = "예약취소";
            } 
          }
          
          var filteredData = resDTOlist.filter(item => {
            var reserveDate = moment(item.reserveDate);
            return reserveDate.isBetween(datePicker[0].startDate, datePicker[0].endDate, 'day', '[]');
          });
          
          filteredData = filteredData.filter(item => {
            if(stateFilter === "전체") {
              return item;
            } else if (stateFilter === "예약취소") {
              return item.showState === "예약취소";
            } else if(stateFilter === "이용완료") {
              return item.showState === "이용완료"
            } else if(stateFilter === "결제완료") {
              return item.showState === "결제완료"
            }
          })
          
          setReserveList(filteredData);
        }
      } catch (error) {
        console.error("Error fetching reservation list:", error);
      }
    };
    fetchData();

    return () => {
      setReserveList([]);
    };
  }, [ loginState.uNo,datePicker,stateFilter]);

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
            <Select options={options} defaultValue={options[0]} onChange={handleSelectChange}/>
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
                  <p className={reserve.showState === "결제완료" ? 'text-green-400' : '' || reserve.showState === "예약취소" ? 'text-red-500' : '' }>{reserve.showState}</p>
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

