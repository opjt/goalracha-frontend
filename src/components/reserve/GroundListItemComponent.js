import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GroundListItem = ({ groundInfo, date, callbackFn }) => {
    var timeArray = {} // 6부터29까지 29는 5시 
    const navigate = useNavigate();
   
    var openTime = groundInfo.openTime
    var closeTime = groundInfo.closeTime
    if(closeTime <= openTime) {
        closeTime +=24;
    }
     for(let i = 6; i<= 29; i++) {
        timeArray[i] = false;
    }
    var split = [];
    if( groundInfo.reserveTime != null) {
        split = groundInfo.reserveTime.split(',')
    } 
    for(let i = openTime; i<= closeTime; i+=parseInt(groundInfo.usageTime)) {
        if(i+parseInt(groundInfo.usageTime) > closeTime) {
            break;
        }
        if(split.includes(`${i}`)) {
            continue;
        }
        for(var i2= 0; i2<parseInt(groundInfo.usageTime); i2++) {
            timeArray[i+i2] = true;
         }
    }


    useEffect(() => {
       
    }, [groundInfo])
    const clickGround = (gno) => {
        navigate(`/ground/${gno}`, { state: {date:date} });

    }
    return (
        <>
            <div className=" my-4 border-b-8 border-gray-50 pb-6 cursor-pointer" onClick={() => clickGround(groundInfo.gno)}>

                <div className="text-lg font-bold">{groundInfo.name}</div>
                <p className="text-sm text-gray-600">{groundInfo.addr}</p>

                <div className="flex justify-between">
                    <div className='text-sm mt-3'>
                        <p className="">{groundInfo.width}•{groundInfo.inAndOut}•{groundInfo.grassInfo}</p>
                        <p className="text-gray-400">{groundInfo.fare.toLocaleString('ko-KR')}원/시간</p>
                    </div>
                    <div>
                    {(groundInfo.uploadFileNames &&  groundInfo.uploadFileNames.length !== 0 ) ? (
                        <img src={`${process.env.REACT_APP_SERVER}/api/ground/g/view/${groundInfo.uploadFileNames[0]}`} className="w-32 h-20 object-cover rounded-lg"></img>
                    ) : 
                    <div className="skeleton w-32 h-20"></div>
                    }
                    
                       
                    </div>
                </div>
                
                
                <div className="flex flex-wrap mt-3 w-full">
                    {Object.entries(timeArray).map(([hour, available]) => (
                        <div key={hour} className={`flex-grow mr-1 h-1 text-xs ${!available ? 'bg-gray-300 text-white' : 'bg-green-500 text-white'}`}>
                        
                        </div>
                    ))}
                </div>
                <div className="w-full flex">
                    <div className="w-1/4 text-sm text-gray-400 ">06시</div>
                    <div className="w-1/4 text-sm text-gray-400">12시</div>
                    <div className="w-1/4 text-sm text-gray-400">18시</div>
                    <div className="w-1/4 text-sm text-gray-400">00시</div>
                </div>
                <div className="flex justify-between">
                    <div className="flex mt-3 mr-3 text-xs">
                        <div className="flex items-center">
                            <span className="badge badge-success gap-2">
                            
                            </span>
                            <p className="ml-1 text-gray-500">예약 가능</p>
                            
                        </div>
                        <div className="ml-3 flex items-center">
                            <span className="badge badge-success gap-2 bg-gray-300">
                            
                            </span>
                            <p className="ml-1 text-gray-500">예약 불가</p>
                        </div>
                    </div>
                    {/* <div className="flex justify-end">
                        <button className="btn btn-md">예약하기</button>
                    </div> */}
                </div>
                  
            </div>
            
        </>
    );
}

export default GroundListItem;
