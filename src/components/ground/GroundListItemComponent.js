import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GroundListItem = ({ groundInfo, callbackFn }) => {
    var timeArray = {} // 6부터29까지 29는 5시 
    const navigate = useNavigate();
    var openTime = groundInfo.openTime
    var closeTime = groundInfo.closeTime
    if(closeTime <= openTime) {
        closeTime +=24;
    }
    for(let i = 6; i<= 29; i++) {
        if(openTime<= i && i <= closeTime) {
            timeArray[i] = true;
        } else {
            timeArray[i] = false;
        }
        
    }
    if(groundInfo.reserveTime != null) {
        var split = groundInfo.reserveTime.split(',')
        for(var e of split) {
            e = parseInt(e);
            timeArray[e] = false;
            for(var i= 1; i<groundInfo.usageTime; i++) {
                e = e+i;
                timeArray[e] = false;
            }
        }

    } 
    // console.log(timeArray);

    useEffect(() => {
        // console.log(groundInfo);
    }, [groundInfo])
    const clickGround = (gno) => {
        navigate(`/ground/${gno}`, { state: { } });

    }
    return (
        <>
            <div className=" my-4 border-b-8 border-gray-50 pb-6" onClick={() => clickGround(groundInfo.gno)}>

                <div className="text-lg font-bold">{groundInfo.name}</div>
                <p className="text-sm text-gray-600">{groundInfo.addr}</p>

                <div className="flex justify-between">
                    <div className='text-sm mt-3'>
                        <p className="">{groundInfo.width}•{groundInfo.inAndOut}•{groundInfo.grassInfo}</p>
                        <p className="text-gray-400">{groundInfo.fare}원/시간</p>
                    </div>
                    <div>
                        <div className="skeleton w-32 h-20"></div>
                    </div>
                </div>
                
                
                <div className="flex flex-wrap mt-3 w-full">
                    {Object.entries(timeArray).map(([hour, available]) => (
                        <div key={hour} className={`flex-grow mr-1 h-1 text-xs ${!available ? 'bg-gray-300 text-white' : 'bg-green-500 text-white'}`}>
                        
                        </div>
                    ))}
                </div>
                <div className="w-full flex">
                    <div className="w-1/4 text-sm text-gray-400">06시</div>
                    <div className="w-1/4 text-sm text-gray-400">12시</div>
                    <div className="w-1/4 text-sm text-gray-400">18시</div>
                    <div className="w-1/4 text-sm text-gray-400">00시</div>
                </div>
                <div className="flex justify-end mt-3 mr-3 text-xs">
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
                  
            </div>
            
        </>
    );
}

export default GroundListItem;
