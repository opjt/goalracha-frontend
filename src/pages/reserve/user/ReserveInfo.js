import { useEffect,useState } from "react";
import BasicLayout from "layouts/BasicLayout";
import { useNavigate, useSearchParams,Link,useLocation } from "react-router-dom";
import { cancelReserv,reserveInfo } from 'api/reserveApi';
import moment from "moment";
const secretKey = `${process.env.REACT_APP_TOSS_SK}`;
const encryptedSecretKey = `${btoa(secretKey + ":")}`;

const initGroundInfo = {
	groundName: '',
	date: '',
	time: '',
	createDate: '',
	pay: '',
	payType: ''
}
const ReserveInfo = () => {
    const navigate = useNavigate();
	const [result, setResult] = useState(initGroundInfo)
	const { state } = useLocation();
    useEffect(() => {
		if(state == null) {
			alert("??");
			navigate("/")
			return;
		}
		reserveInfo(state.payKey).then((res) => {
			var reservInfoData = res.reserveInfo
			reservInfoData.date = moment(reservInfoData.date).format("YYYY-MM-DD")
			reservInfoData.createDate = moment(reservInfoData.createDate).format("YYYY-MM-DD")
			var time = reservInfoData.time.split(",")
			var timeString
			if(time.length == 1) {
				timeString = `${time[0]}:00 ~ ${parseInt(time[0]) +  res.groundInfo.usageTime}:00`;
			} else {
				timeString = `${time[0]}:00 ~ ${parseInt(time[time.length-1]) + res.groundInfo.usageTime}:00`;
			}
			reservInfoData.time =timeString
			reservInfoData.pay = reservInfoData.pay * time.length
			setResult(reservInfoData)
			console.log(res.reserveInfo)
		}).catch((error) => {
			console.log(error)
		})

    }, []);
	// reserveInfo(req.payKeyd).then((result) => {
	// 	console.log(result)
	// }).catch((error) => {
	// 	console.log(error.response.data)
	// })

    const handleOnClick = () => {

        var req = {
            header: encryptedSecretKey,
            payKey: state.payKey
        }
		if (window.confirm("예약을 취소하시겠습니까??") == false){
			return true;
		}  
		console.log(33) 
		cancelReserv(req).then((result) => {
			console.log(result)
			navigate('/user/mypage')
		}).catch((error) => {
		})
       
    }
    return (
        <BasicLayout>
            <div className="">
				<div className="gap-2 flex flex-col">
					<div>
						<p className="text-lg text-center font-bold">예약 상세정보</p>
					</div>
					<div>
						<table className="table max-w-lg mx-auto ">
							<tbody className="border-2 border-slate-200">
							<tr >
								<th className="bg-slate-200 border-b-2 mx-0 border-white text-center w-1/3">구장명</th>
								<td >{result.groundName}</td>
							</tr>
							<tr>
								<th className="bg-slate-200 border-b-2 mx-0 border-white text-center w-fit">날짜</th>
								<td colSpan={2}>{result.date}</td>
							</tr>
							<tr>
								<th className="bg-slate-200  mx-0 border-white text-center w-fit">시간</th>
								<td colSpan={2}>{result.time}</td>
							</tr>
							</tbody>
						</table>
					</div>

					<div>
						<table className="table max-w-lg mx-auto ">
							<tbody className="border-2 border-slate-200">
							<tr >
								<th className="bg-slate-200 border-b-2 mx-0 border-white text-center w-1/3">결제 날짜</th>
								<td >{result.createDate}</td>
							</tr>
							<tr>
								<th className="bg-slate-200 border-b-2 mx-0 border-white text-center w-fit">결제 금액</th>
								<td colSpan={2}>{result.pay}</td>
							</tr>
							<tr>
								<th className="bg-slate-200  mx-0 border-white text-center w-fit">결제 수단</th>
								<td colSpan={2}>{result.payType}</td>
							</tr>
							</tbody>
						</table>
					</div>
					
				</div>
				<div className="py-10 text-center">
					<Link to="/user/mypage"
					className="btn btn-neutral"
					>
					마이페이지
					</Link>
					{result.state == 0 ? (
						<div className="tooltip" data-tip="이미 취소된 예약입니다">
						<div className={`ml-2 btn btn-disabled`} onClick={handleOnClick}>예약 취소</div>
						</div>
					) :
					(
						<div className={`ml-2 btn btn-error `} onClick={handleOnClick}>예약 취소</div>
					)
					}
					
				</div>
            </div>
        </BasicLayout>
    );
}
export default ReserveInfo;