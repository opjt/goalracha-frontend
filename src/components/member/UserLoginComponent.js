// BusinessLoginComponent.js
import React from "react";
import { getKakaoLoginLink } from "api/kakaoAPI";
import { Link } from "react-router-dom"


const UserLoginComponent = ({ handleChange, loginParam, handleClickLogin }) => {
    const link = getKakaoLoginLink()

    return (
        <>

<div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
            

            <div className="relative flex flex-col justify-center overflow-hidden p-2">
                
                    
                    <form className="space-y-4">
                    <div className="w-full pt-6 text-center">
    <p className="mb-8">
        <span className="text-3xl font-bold">kakao</span> <br />
        <span className="mt-12 block">아이디와 비밀번호 입력없이 <br />간편하게 골라차 서비스를 이용해보세요.</span>
    </p>
    <Link to={link} className="btn btn-warning w-full border-inherit bg-yellow-300 text-base font-bold text-opacity-70" style={{backgroundColor: '#fee500'}}>
        카카오 계정으로 로그인
    </Link>
</div>


                    </form>
                
            </div>
    
                <div className="mx-auto w-fit">
                    
                </div>
            </div>

          
            
        </>
        
    );
};

export default UserLoginComponent;
