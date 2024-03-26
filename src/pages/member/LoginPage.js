import React, { useState } from "react";
import MainHeader from "components/layouts/mainHeader";
import { Link } from "react-router-dom";
import IndividualLoginComponent from "components/member/owner/OwnerLoginComponent";
import BusinessLoginComponent from "components/member/user/UserLoginComponent";

const LoginPage = () => {
    const [isIndividual, setIsIndividual] = useState(true); // 개인회원 로그인인지 여부를 나타내는 상태

    const toggleLoginType = () => {
        setIsIndividual(prevState => !prevState);
    };

    return (
        <>
            <div className="max-w-screen-xl mx-auto p-14">
                <div className="relative flex flex-col justify-center overflow-hidden p-4">
                    <div className="flex justify-center items-center mb-6">
                        <button onClick={toggleLoginType}>
                            <div className="grid h-12 w-60 card bg-base-300 rounded-box place-items-center">
                                <span className={`text-lg ${isIndividual ? 'font-bold' : ''} ${isIndividual ? 'text-black' : 'text-gray-600'}`}>개인회원</span>
                            </div>
                        </button>
                        <div className="divider divider-horizontal"></div>
                        <button onClick={toggleLoginType}>
                            <div className="grid h-12 w-60 card bg-base-300 rounded-box place-items-center">   
                                <span className={`text-lg ${!isIndividual ? 'font-bold' : ''} ${!isIndividual ? 'text-black' : 'text-gray-600'}`}>사업자회원</span>
                            </div>
                        </button>
                    </div>
    
                    {/* 개인회원 혹은 사업자회원에 따라 로그인 컴포넌트를 렌더링합니다 */}
                    {isIndividual ? (
                        <BusinessLoginComponent />
                    ) : (
                        <IndividualLoginComponent />
                    )}
                </div>
            </div>
        </>
    );
    
    
};

export default LoginPage;
