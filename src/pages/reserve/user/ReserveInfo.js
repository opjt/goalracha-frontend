import { useEffect } from "react";
import BasicLayout from "layouts/BasicLayout";
import { useNavigate, useSearchParams,Link } from "react-router-dom";
import { cancelReserv } from 'api/reserveApi';
const secretKey = `${process.env.REACT_APP_TOSS_SK}`;
const encryptedSecretKey = `${btoa(secretKey + ":")}`;
console.log(encryptedSecretKey)

const ReserveInfo = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        
    }, []);
    const handleOnClick = () => {

        var req = {
            header: encryptedSecretKey,
            payKey: 'tviva20240320163049noTx9'
        }
        cancelReserv(req).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
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
								<td >ddddddddddd</td>
							</tr>
							<tr>
								<th className="bg-slate-200 border-b-2 mx-0 border-white text-center w-fit">날짜</th>
								<td colSpan={2}>123</td>
							</tr>
							<tr>
								<th className="bg-slate-200  mx-0 border-white text-center w-fit">시간</th>
								<td colSpan={2}>123</td>
							</tr>
							</tbody>
						</table>
					</div>

					<div>
						<table className="table max-w-lg mx-auto ">
							<tbody className="border-2 border-slate-200">
							<tr >
								<th className="bg-slate-200 border-b-2 mx-0 border-white text-center w-1/3">결제 날짜</th>
								<td >ddddddddddd</td>
							</tr>
							<tr>
								<th className="bg-slate-200 border-b-2 mx-0 border-white text-center w-fit">결제 금액</th>
								<td colSpan={2}>123</td>
							</tr>
							<tr>
								<th className="bg-slate-200  mx-0 border-white text-center w-fit">결제 수단</th>
								<td colSpan={2}>123</td>
							</tr>
							</tbody>
						</table>
					</div>
					
				</div>
				<div className="py-10 text-center">
					<Link to="/"
					className="btn btn-neutral"
					>
					마이페이지
					</Link>
					<div className="ml-2 btn btn-error">예약 취소</div>
				</div>
            </div>
        </BasicLayout>
    );
}
export default ReserveInfo;