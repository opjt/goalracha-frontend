import { useEffect } from "react";
import BasicLayout from "layouts/BasicLayout";
import { useNavigate, useSearchParams } from "react-router-dom";
const ReservFail = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

  useEffect(() => {
   
  }, []);

  return (
    <div className="result wrapper">
    <div className="box_section">  
      <h2 style={{padding: "20px 0px 10px 0px"}}>

          결제 실패
          <p>{`code = ${searchParams.get("code")}`}</p>
          <p>{`message = ${searchParams.get("message")}`}</p>
      </h2>
      

    </div>
  </div>
  );
}
export default ReservFail;