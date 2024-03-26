import { useEffect, useState } from "react";
import BasicLayout from "layouts/BasicLayout";
import { useNavigate, useSearchParams, Link} from "react-router-dom";
import { addReserv } from 'api/reserveApi';
import moment from 'moment';
const secretKey = `${process.env.REACT_APP_TOSS_SK}`;
const encryptedSecretKey = `Basic ${btoa(secretKey + ":")}`;

const ReservSuccess = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	var order = {
		gno:searchParams.get("gno"),
		uno:searchParams.get("uno"),
		date:searchParams.get("date"),
		time:searchParams.get("time")
	}
	const [result, setResult] = useState(null)
	async function confirm(requestData) {
		const response = await fetch(
			"https://api.tosspayments.com/v1/payments/confirm",
			{
			method: "POST",
			headers: {
				Authorization: encryptedSecretKey,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(requestData),
			}
		);
		const json = await response.json();
		console.log(json)

		if (!response.ok) {
			// TODO: 구매 실패 비즈니스 로직 구현
			navigate(`/reserve/fail?code=${json.code}&message=${json.message}`);
			throw new Error("응답실패")
		}

		// TODO: 구매 완료 비즈니스 로직 구현
		return json;
	}
	async function doReserv(orderInfo) {
		//orderName: `${groundInfo.gno} ${loginState.uNo} ${reservInfo.date} ${timeArray}`,
		console.log(orderInfo)
		var groundId = orderInfo.gno;
		var userId = orderInfo.uno;
		var date = orderInfo.date;
		var times = orderInfo.time;
		
		var request = {
			date: date,
			time: times,
			uNo: userId,
			gNo: groundId,
			payType: orderInfo.method,
			payKey: orderInfo.paymentKey

		}
		await addReserv(request).then((result) => {
			console.log(result)
			var time = result.resTimeList;
			var timeString;
			if(time.length == 1) {
				timeString = `${time[0]}:00 ~ ${parseInt(time[0]) + result.ground.usageTime}:00`;
			} else {
				timeString = `${time[0]}:00 ~ ${parseInt(time[time.length-1]) + result.ground.usageTime}:00`;
			}
			result.time = timeString;
			setResult(result)
		}).catch((e) => {
			 navigate(`/reserve/fail?message=예약실패 관리자에게 문의하십시오`);
		})
	}

	useEffect(() => {
		const fetchData = async () => {
			const requestData = {
			  orderId: searchParams.get("orderId"),
			  amount: searchParams.get("amount"),
			  paymentKey: searchParams.get("paymentKey"),
			};
		
			console.log(requestData);
		
			try {
			  const result = await confirm(requestData);
			  console.log("결제 성공")
			  order.method = result.method;
			  order.paymentKey = result.paymentKey;
			  await doReserv(order);
			} catch (error) {
				
			}
		  };
		
		  fetchData();
  }, []);

  return (
	
	<BasicLayout>
		{result != null ? 
			<>
			<div className="bg-white p-6  md:mx-auto">
				<svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
				<path
					fill="currentColor"
					d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
				></path>
				</svg>
				<div className="text-center">
				<h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
					결제 완료!
				</h3>
				<p className="text-gray-600 my-2">
					{result.ground.name}
				</p>
				<table className="table max-w-80 mx-auto">
					<thead>
					<tr className="bg-slate-50">
						<th>예약일</th>
						<th>시간</th>
						<th>예약자</th>
					</tr>
					</thead>
					<tbody>
					<tr className="bg-white">
						<td>{moment(result.date).format("YYYY-MM-DD")}</td>
						<td>{result.time}</td>
						<td>{result.memberName}</td>
					</tr>
					</tbody>
				</table>
				<div className="py-10 text-center">
					<Link to="/user/mypage"
					className="btn"
					>
					예약내역 확인
					</Link>
				</div>
				</div>
			</div>
			</> 
		: 
		<>
			<div className="bg-white p-6  md:mx-auto">
				<svg className="mx-auto"xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#898989" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
				<div className="text-center">
				<h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
					잠시만 기다려주세요...
				</h3>
				</div>
			</div>
			
		</>
			
		}
      

    </BasicLayout>
    // <div className="result wrapper">
    // 	<div className="box_section">
    //     	<h2 style={{ padding: "20px 0px 10px 0px" }}>결제 성공</h2>
	// 		<p>{`paymentKey = ${searchParams.get("paymentKey")}`}</p>
	// 		<p>{`orderId = ${searchParams.get("orderId")}`}</p>
	// 		<p>{`amount = ${Number(searchParams.get("amount")).toLocaleString()}원`}</p>
    //   </div>
    // </div>
  );
};
export default ReservSuccess;
