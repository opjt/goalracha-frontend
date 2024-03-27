import { useState, useCallback ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { update } from "slices/searchSlice"
import { useSelector, useDispatch } from 'react-redux';
import BasicLayout from 'layouts/BasicLayout';

import { Calendar } from 'react-date-range'; // 얘가 캘린더 라이브러리
import ko from 'date-fns/locale/ko';	     // 날짜 포맷 라이브러리 (한국어 기능을 임포트)
import moment from 'moment';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { getListbyFilter } from 'api/reserveApi';
import GroundListItem from 'components/reserve/GroundListItemComponent';

const initoption = {
    date:  moment().toDate(),
    time: new Array(12).fill(false),
    inout: {in: false, out:false}
}
const initResult = {
    groundreservList: []
}
const timeRanges = [
    ['06~08시','06시'],
    ['08~10시','08시'],
    ['10~12시','10시'],
    ['12~14시','12시'],
    ['14~16시','14시'],
    ['16~18시','16시'],
    ['18~20시','18시'],
    ['20~22시','20시'],
    ['22~24시','22시'],
    ['00~02시','00시'],
    ['02~04시','02시'],
    ['04~06시','04시'],
  ];
const GroundListPage = () => {
    const [option, setOption] = useState(initoption);   // 검색옵션
    const [showFilter, setShowFilter] = useState({date:"", time:"", inout:"",search:""});
    const [jsonResult, setJsonResult] = useState(initResult);
    const searchState = useSelector((state) => state.searchSlice);
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(3)
        showFilter.search = searchState;
        setShowFilter({...showFilter})
    }, [searchState])

    const onChangeDate = useCallback((date) => { // date 변경값을 받아오는 함수
        if (!date) {return;} // 날짜값이 없을 때 예외처리
        option.date = date;
        setOption({...option})
    },[option]);
    
    useEffect(() => {
        getResultasync(showFilter).then((data) => {
            setJsonResult(data)
        });
      }, [showFilter]);
  
    const initchange = (req) => {
        let reqDate;
        let reqTime;
        let reqInout = [];
        let reqSearch = null;
        if(req.date === '') {
            reqDate = moment().format("YYYY-MM-DD")
        } else {
            reqDate = req.date;
        } 
        // console.log(req.time)
        //시간 기본값 지정
        var hourArray = [];
        if(req.time === '') {
            reqTime = '6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29'
        } else {
            var timeArray = req.time.split(',').map(item => parseInt(item.replace('시', '').trim()));
            timeArray.forEach((value,index) => {
                var push = value;
                if(0 <= push && push <= 4) {
                    push = push +24;
                }
                hourArray.push(push)
                hourArray.push(push+1)
            })    
            hourArray.sort((a,b)=> a-b);
            reqTime = hourArray.join(',')
        }
        // console.log(hourArray);

        //실내외 기본값 지정
        if(req.inout === '') {
            reqInout = ['실내','실외'];
        } else {
            reqInout = req.inout.split(",")
        }
        //검색값 지정
        if(req.search !== '') {
            reqSearch = req.search;
        }
        //req보낼값
        var reqValue = {
            date: reqDate,
            time: reqTime,
            inout: reqInout,
            search: reqSearch
        }
        return reqValue;
    }

    const getResultasync = async (req) => {
        try {
            const reqValue = initchange(req);
            const result = await getListbyFilter(reqValue);
            console.log(result)
            return result;
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangeInOut = (e) => { //실내외 버튼클릭핸들러
        console.log(e.target.checked);
        option.inout[e.target.name] = e.target.checked
      
        setOption({...option })
    
    }
    const handleClickTime = (e) => { //시간버튼 클릭 핸들러
        // console.log(e.target.id)
        option.time[e.target.id] = !option.time[e.target.id];
        setOption({...option})
    }
    const handleClickReset = (e) => { //초기화버튼핸들러
        if(e.target.name === "date") {
            option.date = moment().toDate();
            showFilter.date = ""
        }
        if(e.target.name === "time") {
            option.time = new Array(12).fill(false); setOption({...option});
            showFilter.time = ""
        }
        if(e.target.name === "inout") {
            option.inout = {in: false, out:false};
            showFilter.inout = ""
        }
        if(e.target.name === "search" || e.target.name === undefined) {
            showFilter.search = ""
            dispatch(update(""))
        }
        setShowFilter({...showFilter})
        setOption({...option})
      
    }
    const handleOption= (e) => { //적용버튼옵션핸들러
        if(e.target.name === "time") {
            showFilter.time = option.time.map((time,index) => { 
                if(time === true) {
                    return timeRanges[index][1];
                } else {
                    return null;
                }
            }).filter(time=> time != null).join(', ');
        }
        if(e.target.name === "date") {
            showFilter.date = moment(option.date).format("YYYY-MM-DD");
        }
        if(e.target.name === "inout") {
            var values = {"실내": option.inout.in, "실외":option.inout.out}
            showFilter.inout = Object.keys(values).filter(key => values[key] === true).join(',');
        }
        setShowFilter({...showFilter})
        // console.log(showFilter)

    }

    return (
        <BasicLayout>
       <div className='mt-6 flex gap-3'>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className={`btn btn-sm  gap-1 ${showFilter.date !== '' ? 'btn-neutral' : ''}`} onClick={()=> {document.getElementById('my_modal_1').showModal()}}>
                {showFilter.date !== '' ? showFilter.date : '날짜선택'}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" ><path d="M6 9l6 6 6-6"/></svg></button>
            <button className={`btn btn-sm  gap-1 ${showFilter.time !== ''?  "btn-neutral" : ""}`}  onClick={()=> { document.getElementById('my_modal_2').showModal()}}>
                {showFilter.time !== '' ? showFilter.time : "시간"}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" ><path d="M6 9l6 6 6-6"/></svg></button>
            <button className={`btn btn-sm  gap-1 ${showFilter.inout !== ''?  "btn-neutral" : ""}`}  onClick={()=> { document.getElementById('my_modal_3').showModal()}}>
                {showFilter.inout||"실내외"}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" ><path d="M6 9l6 6 6-6"/></svg></button>
            {showFilter.search !== '' && (
                <button className={`btn btn-sm  gap-1 btn-neutral`} name="search" onClick={handleClickReset}>
                {showFilter.search}
                <svg xmlns="http://www.w3.org/2000/svg" name="search" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                </button>
            )}

        </div>

        <div className="mt-5">
            {jsonResult && jsonResult["groundreservList"].length >= 1 ? (
                jsonResult["groundreservList"].map((item) => {
                const groundNo = item[0]; // 구장 번호를 변수로 지정
                const groundInfo = jsonResult.groundlist[groundNo]; // 구장 정보를 찾음
                groundInfo.reserveTime = item[1];

                return (
                    <GroundListItem key={groundNo} groundInfo={groundInfo} date={showFilter.date}/>
                );
                })
            ) : (
                <div className='p-3 font-bold text-lg text-center bg-gray-200 rounded-lg'>조건과 일치하는 구장이 없습니다</div>
            )}
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
                date={option.date}		// 날짜값
                onChange={onChangeDate} 	     // onChange 함수
                dateDisplayFormat="yyyy-mm.dd" // 날짜 포맷값
            />
            <div className="modal-action">
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-neutral mr-2" name="date" onClick={handleOption}>적용</button>
                <button className="btn" name="date" onClick={handleClickReset}>초기화</button>
            </form>
            </div>
        </div>
        <form method="dialog" className="modal-backdrop">
            <button>close</button>
        </form>
        </dialog>

        {/* 시간 모달 */}
        <dialog id="my_modal_2" className="modal">
        <div className="modal-box max-w-sm">
            <h3 className="font-bold text-lg">시간</h3>
            <div className='gap-1 flex flex-wrap justify-center'>
                {timeRanges.map((time, index) => (
                    <button key={index} id={index} value={time[1]}className={`p-2 text-xs btn w-20 ${option.time[index] == true ? 'btn-primary' : ''}`} onClick={handleClickTime}>{time[0]}</button>
                ))}
                
            </div>
            <div className="modal-action">
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-neutral mr-2" name="time" onClick={handleOption}>적용</button>
                <button className="btn" name="time" onClick={handleClickReset}>초기화</button>
            </form>
            </div>
        </div>
        <form method="dialog" className="modal-backdrop">
            <button>close</button>
        </form>
        </dialog>

        {/* 실내외 모달 */}
        <dialog id="my_modal_3" className="modal">
        <div className="modal-box max-w-96">
            <h3 className="font-bold text-lg">실내외</h3>
            <div className="">
                <label className="label cursor-pointer justify-normal gap-3">
                    
                    <input type="checkbox" name="in" className="checkbox" checked={option.inout.in} onChange={handleChangeInOut}/>
                    <span className="label-text">실내</span> 
                </label>
                <label className="label cursor-pointer justify-normal gap-3">
                    
                    <input type="checkbox" name="out" className="checkbox"  checked={option.inout.out} onChange={handleChangeInOut}/>
                    <span className="label-text">실외</span> 
                </label>
            </div>
            <div className="modal-action">
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-neutral mr-2" name="inout"  onClick={handleOption}>적용</button>
                <button className="btn" name="inout" onClick={handleClickReset}>초기화</button>
            </form>
            </div>
        </div>
        <form method="dialog" className="modal-backdrop">
            <button>close</button>
        </form>
        </dialog>
      </BasicLayout>
    );
}
export default GroundListPage;