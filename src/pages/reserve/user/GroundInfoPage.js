import { useEffect , useState} from "react";
import { useParams,useLocation } from "react-router-dom";
import BasicLayout from "layouts/BasicLayout";
import { getInfoByGno } from 'api/reserveApi';


const GroundInfoPage = () => {
    const { gno } = useParams();
    const { state } = useLocation();
    
    const [resultValue, setResultValue] = useState(null);   
    const [groundInfo, setGroundInfo] = useState(null);   
    
    useEffect(() => {
        console.log(gno)
        console.log(state)
        var req = {
            gno: gno,
            date: state.date || "2024-03-12"
        }
        getInfoByGno(req).then((result) => {
            console.log(result)
            setGroundInfo(result.groundInfo)
            
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
                

            </div>
            
            )}
        </BasicLayout>
    );
}
export default GroundInfoPage;