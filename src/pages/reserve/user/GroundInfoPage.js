import { useEffect , useState, useCallback} from "react";
import { useParams,useLocation } from "react-router-dom";
import BasicLayout from "layouts/BasicLayout";
import { getInfoByGno } from 'api/reserveApi';

import { Calendar } from 'react-date-range'; // 얘가 캘린더 라이브러리
import ko from 'date-fns/locale/ko';	     // 날짜 포맷 라이브러리 (한국어 기능을 임포트)
import moment from 'moment';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import ResultModal from "components/common/ResultModal";
import ReserveModal from "components/reserve/ReserveComponent";
import useCustomLogin from "hooks/useCustomLogin";

var initReserv = {
    date: '',
    time: {},
    value: 0,
    submit: false
}
const GroundInfoPage = () => {
    const { gno } = useParams();
    const { state } = useLocation();
    var reqDate = moment().format("YYYY-MM-DD");
    
    if(state && state.date !== '') {
        reqDate= state.date
    }
    initReserv.date = reqDate;
    const [calDate, setCalDate] = useState(moment().toDate());
    const [timeArray, setTimeArray] = useState(null);   
    const [groundInfo, setGroundInfo] = useState(null);   
    const [imgslide, setImgslide] = useState(0);
    const [reservInfo, setReservInfo] = useState(initReserv);   
    const [modal, setModal] = useState(null);
    const { moveToPath, isLogin, moveToLogin} = useCustomLogin()
    

    const onChangeDate = useCallback((date) => { // date 변경값을 받아오는 함수
        if (!date) {return;} // 날짜값이 없을 때 예외처리
        setCalDate(date)
    },[calDate]);

    const handleClickDate = (e) => { //날짜버튼 클릭 핸들러
        reservInfo.date = moment(calDate).format("YYYY-MM-DD");
        setReservInfo({...reservInfo})
        
    }
    const handleClickCarousel = (e) => { //날짜버튼 클릭 핸들러
        let imgno = imgslide;
        if(e.target.id == "left") {
            imgno = (imgno == 0 ? groundInfo.uploadFileNames.length-1 : imgno-1)
        } else if (e.target.id=="right") {
            imgno = (imgno == groundInfo.uploadFileNames.length-1 ? 0 : imgno+1)
        }
        setImgslide(imgno)
            
        
    }
    const handleClickTime = (e) => { //시간버튼 클릭 핸들러
        
        var selectId = e.target.id;
        var falseValues = Object.entries(reservInfo.time).filter(([key, value]) => value === false).map(([key, value]) => parseInt(key));
        if(falseValues.length !== 0) {
            if(!(falseValues.includes(parseInt(selectId)+groundInfo.usageTime) || falseValues.includes(parseInt(selectId)-groundInfo.usageTime) ||falseValues.includes(parseInt(selectId)))) {
                setModal('연속된 시간으로만 예약하실 수 있습니다')
                return
            }
            if((falseValues.includes(parseInt(selectId)+groundInfo.usageTime) && falseValues.includes(parseInt(selectId)-groundInfo.usageTime))) {
                setModal('연속된 시간으로만 예약하실 수 있습니다')
                return
            }
        } 
        console.log(e.target.id+" " + reservInfo.time[e.target.id])
        reservInfo.time[e.target.id] = !reservInfo.time[e.target.id]
        falseValues = Object.entries(reservInfo.time).filter(([key, value]) => value === false).map(([key, value]) => parseInt(key));

        reservInfo.value = falseValues.length*groundInfo.fare;
        setReservInfo({...reservInfo})
        
    }

    useEffect(() => {
        var req = {
            gno: gno,
            date: reservInfo.date
        }
        getInfoByGno(req).then((result) => {
            console.log(result)
            setGroundInfo(result.groundInfo)
            var openTime = result.groundInfo.openTime;
            var closeTime = result.groundInfo.closeTime;
            if(closeTime <= openTime) {
                closeTime +=24;
            }
            var newTimeArray = {};
            for(let hour = openTime; hour<closeTime; hour+=result.groundInfo.usageTime) {
                newTimeArray[hour] = true;
            }
            reservInfo.time = {...newTimeArray};
            setReservInfo({...reservInfo})
            if(result.reservList != null) {
                for(var e of result.reservList) {
                    var etime = parseInt(e.time);
                    newTimeArray[etime] = false;
                }
            } 
            console.log(newTimeArray);
            setTimeArray(newTimeArray)
   
        })
    }, [reservInfo.date])
    const closeModal = () => {
          setModal(null);
          reservInfo.submit= false;
          setReservInfo({...reservInfo})
        }
    const handleClickReserve = () => {
        if(!isLogin) {
            moveToLogin();
            return;
        } 
        reservInfo.submit = true;
        setReservInfo({...reservInfo})
    }

    return (
        <BasicLayout>
            {reservInfo.submit ? (
                <ReserveModal reservInfo={reservInfo} groundInfo={groundInfo} callbackFn={closeModal}/>
            ) : (
                <></>
            )}
            {modal ? <ResultModal title={`예약`} content={modal} close={`닫기`}
                    callbackFn={closeModal}></ResultModal> : <></>}
            {groundInfo != null && (

            
            <div className="p-2">
                
            
                <div className="carousel w-full h-80">
                
                        <div id={`slide${imgslide}`} className="carousel-item relative w-full overflow-hidden " style={{ transition: 'transform 2s ease-in-out' }}>
                            {(groundInfo.uploadFileNames &&  groundInfo.uploadFileNames.length !== 0 ) ? (
                                <img src={`http://localhost:8080/goalracha/ground/view/${groundInfo.uploadFileNames[imgslide]}`} className="w-full h-full object-cover" /> 
                            ) : 
                              <div className="skeleton w-full h-full"></div>
                            }
                    
                            {/* <img src={`http://localhost:8080/goalracha/ground/view/${groundInfo.uploadFileNames[imgslide]}`} className="w-full h-full object-cover" /> */}
                            
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <div id="left" className="btn btn-circle" onClick={handleClickCarousel}>❮</div> 
                                <div id="right" className="btn btn-circle" onClick={handleClickCarousel}>❯</div> 
                                
                            </div>
                        </div>
                
                    {/* {groundInfo.uploadFileNames.map((imgFile, i) =>
                        <div id={`slide${i}`} className="carousel-item relative w-full overflow-hidden">
                            <img src={`http://localhost:8080/goalracha/ground/view/${imgFile}`} className="w-full h-full object-cover" />
                            
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href={`#slide${(i == 0 ? groundInfo.uploadFileNames.length-1 : i-1)}`} className="btn btn-circle">❮</a> 
                                <a href={`#slide${i == groundInfo.uploadFileNames.length-1 ? 0 : i+1}`} className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    )} */}

                
                </div>

                <div className="grid md:grid-flow-col mt-6 gap-y-5">

                    <div className="w-fit">
                        <div className="text-2xl font-medium">
                            {groundInfo.name}
                        </div>
                        <div className="text-base text-gray-600">
                            {groundInfo.addr}
                        </div>
                        <div className="mt-4 w-fit">
                            <div className="font-medium text-xl pb-1">구장정보</div>
                            <div className="text-base">
                                <div>구장크기 <span className="text-gray-800">{groundInfo.width}</span></div>
                                <div>추천인원 <span className="text-gray-800">{groundInfo.recommdMan}</span></div>
                                <div>잔디정보 <span className="text-gray-800">{groundInfo.grassInfo}</span></div>
                        </div>
                    </div>
                    </div>
                    <div  className="w-fit">
                        <div className="font-bold text-xl text-gray-900" >
                            시설정보
                        </div>
                        <ul className="p-2">
                            <li className="w-2/5 inline-flex py-1">풋살화 대여</li>
                            <li className="w-2/5 inline-flex py-1">풋살공 대여</li>
                            <li className="w-2/5 inline-flex py-1">조끼 대여</li>
                            <li className="w-2/5 inline-flex py-1">냉난방 시설</li>
                            <li className="w-2/5 inline-flex py-1">샤워실</li>
                            <li className="w-2/5 inline-flex py-1">주차장</li>
                        </ul>
                    </div>
                  
                </div>
                <div className="mt-10  mx-auto ">
                    <div className="font-bold inline-block">예약 날짜/시간 선택</div>
                    <button className={`float-right btn btn-sm  gap-1 `} onClick={()=> {document.getElementById('my_modal_1').showModal()}}>
                    {reservInfo.date !== '' ? reservInfo.date : '날짜선택'}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" ><path d="M6 9l6 6 6-6"/></svg></button>

                    <div className="mt-3 gap-2 max-sm:flex flex-col justify-center py-4 bg-gray-50 whitespace-nowrap overflow-x-auto">
                        {Object.entries(timeArray).map(([hour, available]) => (
                            <div key={hour} id={hour} className={`h-14 btn mr-1 ${!available ? 'btn-disabled' : ''}
                                 ${!reservInfo.time[hour] ? 'btn-primary': 'btn-neutral'}` } onClick={handleClickTime}>
                                {hour}~{parseInt(hour) + parseInt(groundInfo.usageTime)}시({groundInfo.usageTime}시간)
                            </div>
                        ))}
                    </div>

                </div> 

                <div className="flex justify-end mt-4 ">
                    <div className="flex items-center flex-col">
                        <div className="font-bold text-lg mb-2">
                            
                            총 결제 금액   {reservInfo.value !== 0 ? reservInfo.value : 0}  원
                        </div>
                        <div className={`btn btn-wide ${reservInfo.value === 0 ? 'btn-disabled' : ''}`} onClick={handleClickReserve}>
                            예약하기
                        </div>
                    </div>
                </div>  
                {/* 날짜 모달 */}
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">날짜</h3>
                        <Calendar style={{width:'100%'}} className="w-full"
                            locale={ko} 	// 한국어 달력
                            months={1}  	// 1달치 달력만 디스플레이
                            minDate={moment().toDate()}
                            maxDate={moment().add(14, 'd').toDate()} //최대날짜
                            date={calDate}		// 날짜값
                            onChange={onChangeDate} 	     // onChange 함수
                            dateDisplayFormat="yyyy-mm.dd" // 날짜 포맷값
                        />
                        <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-neutral mr-2" name="date" onClick={handleClickDate}>적용</button>
                        </form>
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
         
                    
            </div>
                
            )}
        </BasicLayout>
    );
}
export default GroundInfoPage;