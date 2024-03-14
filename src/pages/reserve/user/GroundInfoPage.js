import { useEffect , useState} from "react";
import { useParams,useLocation } from "react-router-dom";
import BasicLayout from "layouts/BasicLayout";
import { getInfoByGno } from 'api/reserveApi';
import moment from "moment";

const GroundInfoPage = () => {
    const { gno } = useParams();
    const { state } = useLocation();
    var reqDate = moment().format("YYYY-MM-DD");
    
    if(state && state.date !== '') {
        reqDate= state.date
    }
    const [timeArray, setTimeArray] = useState(null);   
    const [timeArray2, setTimeArray2] = useState(null);   
    const [groundInfo, setGroundInfo] = useState(null);   

    useEffect(() => {
        var req = {
            gno: gno,
            date: reqDate
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
            var newTimeArray2 = {};
            for(let i = 6; i <= 29; i++) {
                newTimeArray[i] = openTime <= i && i <= closeTime;
            }
            for(let hour = openTime; hour<closeTime; hour+=result.groundInfo.usageTime) {
                newTimeArray2[hour] = true;
            }
            
            
            if(result.reservList != null) {
                for(var e of result.reservList) {
                    var etime = parseInt(e.time);
                    newTimeArray2[etime] = false;
                    newTimeArray[etime] = false;
                    for(var i= 1; i<result.groundInfo.usageTime; i++) {
                        etime = etime+i;
                        newTimeArray[etime] = false;
                    }
                }
            } 
            console.log(newTimeArray2);
            setTimeArray2(newTimeArray2)
            setTimeArray(newTimeArray);
   
        })
    }, [])
 

    return (
        <BasicLayout>
            {groundInfo != null && (

            
            <div className="p-2">
                <div className="carousel w-full h-80">
                    <div id="slide1" className="carousel-item relative w-full  overflow-hidden">
                        
                            <img src="https://d31wz4d3hgve8q.cloudfront.net/media/IMG_4659.jpg" className="w-full h-full object-cover" />
                        
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide4" className="btn btn-circle">❮</a> 
                        <a href="#slide2" className="btn btn-circle">❯</a>
                        </div>
                    </div> 
                
                </div>

                <div className="grid md:grid-flow-col mt-6 gap-y-5">

                    <div className="w-fit">
                        <div className="text-2xl font-medium">
                            {groundInfo.name}
                        </div>
                        <div className="text-base text-gray-600">
                            {groundInfo.addr}
                        </div>
                        <div className="mt-7 w-fit">
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
                <div className="mt-10">
                    <div className="font-bold">시간 선택</div>
                    <div className="flex mt-3 gap-2 max-w-3/4 overflow-x-scroll overflow-hidden p-2 pt-0">

                        {Object.entries(timeArray2).map(([hour, available]) => (
                        <div key={hour} className={`flex-shrink-0  btn btn-wide ${!available ? 'bg-gray-300 text-white' : 'bg-green-500 text-white'}`}>
                            {hour}~{parseInt(hour)+parseInt(groundInfo.usageTime)}
                        </div>
                    ))}
                    </div>
                </div>   
              
                

            </div>
            
            )}
        </BasicLayout>
    );
}
export default GroundInfoPage;