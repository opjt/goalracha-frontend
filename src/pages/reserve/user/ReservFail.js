import { useEffect } from "react";
import BasicLayout from "layouts/BasicLayout";
import { useNavigate, useSearchParams } from "react-router-dom";
const ReservFail = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

  useEffect(() => {
   
  }, []);

  return (

    <BasicLayout>
		{searchParams != null && (
			  <>
        {searchParams !== null && (
            <div className="bg-white p-6 md:mx-auto">
                <svg className="w-20 h-20 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                        결제 실패
                    </h3>
                    <div className="text-gray-600 my-2">
                        <p>{`code = ${searchParams.get("code")}`}</p>
                        <p>{`message = ${searchParams.get("message")}`}</p>
                    </div>
                </div>
            </div>
            
        )}
        </>
    )}
    
      

    </BasicLayout>
  //   <div className="result wrapper">
  //   <div className="box_section">  
  //     <h2 style={{padding: "20px 0px 10px 0px"}}>

  //         결제 실패
  //         <p>{`code = ${searchParams.get("code")}`}</p>
  //         <p>{`message = ${searchParams.get("message")}`}</p>
  //     </h2>
      

  //   </div>
  // </div>
  );
}
export default ReservFail;