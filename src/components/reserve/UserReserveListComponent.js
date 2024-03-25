import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserReservationStatus, reserveInfo } from "api/reserveApi";
import PageComponent from "components/common/pageComPonent";
import useCustomLogin from "hooks/useCustomLogin";
import BasicLayout from "layouts/BasicLayout";
import moment from "moment";

const UserReserveListComponent = () => {
	const [reserveList, setReserveList] = useState([]);
	const { loginState } = useCustomLogin();
	const [reservCount, setReservCount] = useState({total:0,pay:0,cancel:0,prev:0})
	const navigate = useNavigate();


	useEffect(() => {
		const fetchData = async () => {
			try {
				// 로그인 상태에 따라 API 요청을 보내거나 보내지 않음
				if (loginState.uNo) {
					const reserveData = await getUserReservationStatus(
						{ page: 1, size: 999999999 },
						loginState.uNo
					);
					setReserveList(reserveData.dtoList);
					for(var reserv of reserveData.dtoList) {
						
						if(reserv.state == 0) {
							reservCount.cancel++;
							continue
						}
						if(moment(reserv.reserveDate).isBefore(moment().subtract(1, 'days'))) {
							reservCount.prev++;
							continue
						}
						reservCount.pay++;

					}
					console.log(reserveData);
					reservCount.total =  reserveData.totalCount
					setReservCount({...reservCount})
				}
			} catch (error) {
				console.error("Error fetching reservation list:", error);
			}
		};
		fetchData();


	}, [loginState.uNo]);

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
		<>
			{reserveList.length == 0 && (
				<div className="p-2 text-center"> 예약 정보가 없습니다</div>
			)}
			<div className="my-2">
				<div className="flex  bg-slate-200 rounded-lg p-2 py-4 text-center">
					<div className="border-r-2 border-gray-300 p-4 w-1/4">
						<p className="text-sm">전체</p>
						<p className="text-lg font-bold">{reservCount.total}</p>
					</div>
					<div className="w-1/4 p-4">
						<p className="text-sm">결제완료</p>
						<p className="text-lg font-bold">{reservCount.pay}</p>
					</div>
					<div className="w-1/4 p-4">
						<p className="text-sm">예약취소</p>
						<p className="text-lg font-bold">{reservCount.cancel}</p>
					</div>
					<div className="w-1/4 p-4">
						<p className="text-sm">이용완료</p>
						<p className="text-lg font-bold">{reservCount.prev}</p>
					</div>
				</div>
			</div>
			{reserveList.slice(0,3).map((reserve, index) => (
				<div key={index} className="border-b-[1px] border-gray-200 p-3 flex justify-between cursor-pointer" onClick={() => handleClick(reserve.payKey)}>
					<div className="flex flex-col flex-1 min-w-0 whitespace-nowrap">
						<p className="text-md text-ellipsis overflow-hidden ">{reserve.groundName} <span>[{changeTimeToString(reserve.time, reserve.usageTime)}]</span></p>
						<p className="text-sm text-gray-500 ">{reserve.groundAddr}</p>
					</div>

					<div className="flex justify-between w-1/5 min-w-36 items-center text-sm">
						<div className="">
							{moment(reserve.reserveDate).format("YYYY-MM-DD")}
						</div>
						<div className="text-nowrap ">
							{reserve.state === 0 ? (
								<p className="text-red-500">예약취소</p>
							) :
								moment(reserve.reserveDate).isBefore(moment().subtract(1, 'days')) == true ? (
									<p className="">이용완료</p>
								)
									:
									(
										<p className="text-green-500">결제완료</p>
									)
							}



						</div>
					</div>
				</div>
			))}

			

		</>
	);
};

export default UserReserveListComponent;

