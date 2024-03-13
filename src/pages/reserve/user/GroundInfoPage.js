import { useEffect } from "react";
import { useParams } from "react-router-dom";
const GroundInfoPage = () => {
    const { gno } = useParams();
    
    useEffect(() => {
        console.log(gno)
    })
    return (
        <>

            <div>ㅎㅇ</div>
            

        </>
    );
}
export default GroundInfoPage;