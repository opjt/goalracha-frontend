import { Calendar } from 'react-date-range'; // 얘가 캘린더 라이브러리
import BasicLayout from 'layouts/BasicLayout';
import ko from 'date-fns/locale/ko';	     // 날짜 포맷 라이브러리 (한국어 기능을 임포트)
import moment from 'moment';
import { useState, useCallback } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const initoption = {
    date:  moment().toDate(),
    time: new Array(12).fill(false),
    inout: {in: false, out:false}
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
    const [showFilter, setShowFilter] = useState({date:"", time:"", inout:""});
    const onChangeDate = useCallback((date) => { // date 변경값을 받아오는 함수
        if (!date) {return;} // 날짜값이 없을 때 예외처리
        option.date = date;
        setOption({...option})
    },[option]);
 
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
        console.log(e.target.name);
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

    }

    return (
        <BasicLayout>
       <div className='mt-6 flex gap-3'>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className={`btn btn-sm  gap-1 ${showFilter.date !== '' ? 'btn-neutral' : ''}`} onClick={()=> {document.getElementById('my_modal_1').showModal()}}>
                {showFilter.date !== '' ? showFilter.date : '날짜선택'}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" ><path d="M6 9l6 6 6-6"/></svg></button>
            <button className={`btn btn-sm  gap-1 ${showFilter.time != ''?  "btn-neutral" : ""}`}  onClick={()=> { document.getElementById('my_modal_2').showModal()}}>
                {showFilter.time != '' ? showFilter.time : "시간"}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" ><path d="M6 9l6 6 6-6"/></svg></button>
            <button className={`btn btn-sm  gap-1 ${showFilter.inout != ''?  "btn-neutral" : ""}`}  onClick={()=> { document.getElementById('my_modal_3').showModal()}}>
                {showFilter.inout||"실내외"}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" ><path d="M6 9l6 6 6-6"/></svg></button>
        </div>

        <div className="h-screen">
        </div>

        {/* 날짜 모달 */}
        <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">날짜</h3>
            <Calendar style={{width:'100%'}} className="w-full"
                locale={ko} 	// 한국어 달력
                months={1}  	// 1달치 달력만 디스플레이
                minDate={moment().toDate()}
                maxDate={moment().add(14, 'd').toDate()}
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