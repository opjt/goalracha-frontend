import useCustomLogin from "hooks/useCustomLogin";
import { useEffect ,useState, useRef} from "react";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { login } from "slices/loginSlice";
import { nanoid } from "nanoid";

const text1 = `대관 서비스 개인정보 제3자 제공 방침

1. 수집 항목 : 실명, 휴대전화번호, 이메일, 주소, 생년월일, ID 등
2. 수집 목적 : 시설 대관 관리
3. 보관 기간 : 대관 일시로부터 1년
4. 제공 받는 자 : 해당 체육시설

대관 서비스 개인정보 제3자 제공 방침에 동의하지 않을 수 있습니다. 본 방침에 동의하지 않을 시 해당 시설과 대관 서비스를 이용 하실 수 없습니다.`

const text2 = `시설 이용 약관

1. 건물 내부 및 근처에서 절대 금연입니다.
2. 체육시설 내 음식물, 주류, 음료 반입 금지합니다.
3. 시설 이용 중 시설물 및 기물 파손은 즉각 담당자에게 보고해야하며, 대관 신청자가 원상복구 혹은 변상해야 합니다.
4. 시설물 및 기물의 용도와 위치의 변경, 광고물(현수막 등) 설치 등은 반드시 관리자에게 사전 승인을 받아야합니다.
5. 해당 시설을 이용한 상업 행위, 유료 강습, 이윤추구는 엄격하게 금지되어 있습니다.
6. 시설 이용 후 폐기물, 오물 등 뒷정리 및 원상복구 해주셔야 합니다.
7. 대관 확정 후 시설의 급한 사정으로 인해 대관이 취소 될 수 있으며, 이점 협조 부탁드립니다.
8. 과도한 소음 및 소란 행위는 금지되어 있습니다.
9. 체육 경기 외 목적(행사 진행 등)으로 이용 시 담당자에게 사전 승인을 받아야합니다.
10. 미풍양속을 해치는 행위, 풍기문란 행위, 노상방뇨 등은 금지되어 있습니다.
11. 본 시설은 시설 이용 시 발생 할 수 있는 부상 및 사고 발생 등 모든 재해에 책임지지 않습니다.
12. 본 시설을 대관 한 후 타인에게 무단 양도하는 행위는 엄격히 금지되어 있습니다.
13. 본 내용을 위반 하였을 시, 이용 취소 및 제재가 가해지며 이로 인한 손해는 전적으로 책임자 및 해당 팀에게 있습니다.
14. 시설 물 이용 중 모든 이용자에게 선량한 관리자의 의무가 부여됩니다. 허가받지 않은 제 3자의 무단이용, 홍보행위, 기물 파손, 소음 발생 등의 행위를 제지해주십시오.
15. 본 시설은 애완동물 출입 및 바퀴달린 운동기구 이용이 금지되어 있습니다.
16. 대관 신청자는 시설의 공지 사항, 환불규정, 이용규칙 등 모든 안내 내용을 숙지해야하며 해당 내용을 준수하는 것에 동의 합니다. 내용 미숙지로 인한 책임은 이용자 본인에게 있습니다.
17. 본 내용에 대한 동의 서명은 생략하며, 서비스 내 동의 버튼으로 이를 대체합니다.`
const selector = "#payment-widget";
const clientKey = `${process.env.REACT_APP_TOSS_CK}`;
const customerKey = "ANONYMOUS";

const ReserveModal = ({ reservInfo ,groundInfo, callbackFn}) => {
    const { moveToPath, isLogin, loginState} = useCustomLogin()
    const paymentWidgetRef = useRef(null);
    const paymentMethodsWidgetRef = useRef(null);
    const [times, setTimes ] = useState(null);
    const [boxcheck, setBoxcheck] = useState({check1: false,check2:false})
    const customStyle = {
        cursor: 'initial',
        background: 'initial',
        color: 'black'
      };
      const handleChange = (e) => {
        boxcheck[e.target.name] = e.target.checked;
        
        console.log(boxcheck)
        setBoxcheck({ ...boxcheck })

    }
    useEffect(() => {
        
        var falseValues = Object.entries(reservInfo.time).filter(([key, value]) => value === false).map(([key, value]) => parseInt(key));
        console.log(falseValues[0])
        if(falseValues.length == 1) {
            setTimes(`${falseValues[0]}:00 ~ ${parseInt(falseValues[0]) + groundInfo.usageTime}:00`)
        } else {
            setTimes(`${falseValues[0]}:00 ~ ${falseValues[falseValues.length-1]}:00`)
        }
        (async () => {
            const paymentWidget = await loadPaymentWidget(clientKey, customerKey);
      
            const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
              selector,
              { value: reservInfo.value },
              { variantKey: "DEFAULT" }
            );
      
            paymentWidgetRef.current = paymentWidget;
            paymentMethodsWidgetRef.current = paymentMethodsWidget;
          })();
    },[])
    const handleCloseModal = (e) => {
        // 모달 내부 요소를 클릭한 경우 무시
        if (e.target.closest('.modal-box')) {
            return;
        }
        // 모달 닫기 콜백 함수 호출
        if (callbackFn) {
            callbackFn();
        }
    };
    const handleClickReserve = async () => {
        console.log(boxcheck)
        const paymentWidget = paymentWidgetRef.current;

        try {
            var falseValues = Object.entries(reservInfo.time).filter(([key, value]) => value === false).map(([key, value]) => parseInt(key));
            var timeArray = falseValues.join(",")
            console.log(timeArray)

          await paymentWidget?.requestPayment({
            orderId: nanoid(),
            // orderId: `${loginState.uNo}_${reservInfo.date}`,
            // orderName: `${groundInfo.gno} ${loginState.uNo} ${reservInfo.date} ${timeArray}`,
            orderName: `${groundInfo.name}`,
            successUrl: `${window.location.origin}/reserve/success?gno=${groundInfo.gno}&uno=${loginState.uNo}&date=${reservInfo.date}&time=${timeArray}`,
            failUrl: `${window.location.origin}/reserve/fail`
          });
        } catch (error) {
          // handle error
        }
    }
    return (
        <dialog id="payment" className="modal modal-open"onClick={handleCloseModal} >
            <div className="modal-box pointer-events-auto w-11/12 max-w-5xl">
                <h3 className="font-bold text-lg">풋살장 예약하기 | {groundInfo.name} <span className="text-gray-60000 text-sm font-normal">({groundInfo.addr})</span></h3>
                <div className="mt-3 flex justify-around">
                    <div className="w-5/12">
                        <div className="my-2 font-bold text-sm">
                            개인정보 제 3자 제공 방침 및 시설 이용 약관
                        </div>
                        <div className="">
                            <textarea disabled className="w-full h-28 input input-bordered overflow-auto bg-gray-200 text-sm" style={customStyle}  defaultValue={text1}/>
                    
                            <div className="flex items-center">
                                <input type="checkbox" className="checkbox checkbox-sm" name="check1" id="check1" value={boxcheck[0]} onChange={handleChange}/>
                                <label className="ml-1 text-sm" htmlFor="check1">위의 개인정보 취급방침에 동의합니다.</label>
                            </div>
                        </div>
                        <div className="mt-2">
                            <textarea disabled className="w-full h-28 input input-bordered overflow-auto bg-gray-200 text-sm" style={customStyle} defaultValue={text2}/>
                            <div className="flex items-center">
                                <input type="checkbox" className="checkbox checkbox-sm" name="check2" id="check2"  value={boxcheck[1]} onChange={handleChange}/>
                                <label className="ml-1 text-sm" htmlFor="check2">위의 시설 이용 약관에 동의합니다.</label>
                            </div>
                        </div>
                    </div>

                    <div className="w-5/12">
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                <tr className="bg-base-200">
                                    <th>예약일</th>
                                    <th>시간</th>
                                    <th>가격</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className="">
                                    <td>{reservInfo.date}</td>
                                    <td>{times}</td>
                                    <td>{reservInfo.value}</td>
                                </tr>
              
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-3">
                            <div className="border-2 rounded-lg p-2">
                                <div className="w-2/5 inline-flex text-center font-semibold">신청자</div>
                                <div className="w-fit inline-flex">{loginState.name}</div>
                            </div>
                            <div className="border-2 rounded-lg p-2 mt-1">
                                <div className="w-2/5 inline-flex text-center font-semibold">연락처</div>
                                <div className="w-fit inline-flex">{loginState.tel}</div>
                            </div>
                            {/* <div className="border-2 rounded-lg p-2 mt-1 flex">
                                <div className="w-2/5 inline-flex text-center font-semibold">결제방법</div>
                                <div className="w-fit inline-flex ">
                                    <input type="radio" name="radio-1" className="radio" defaultChecked={true}/>
                                    <label className="ml-2"><img src="/img/kpay.png" className="h-6 bg-yellow-300 p-1 rounded-md"/></label>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    
                </div>
                <div id="payment-widget" />

                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className={`btn btn-wide ${(boxcheck.check1 && boxcheck.check2)  ? '' : 'btn-disabled'}`} onClick={handleClickReserve}>결제</button>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
            </dialog>
    );
}

export default ReserveModal;

