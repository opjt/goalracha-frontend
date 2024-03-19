import MainHeader from "components/layouts/mainHeader";
import { getKakaoLoginLink } from "api/kakaoAPI";
import { Link } from "react-router-dom"

const LoginPage = () => {
    const link = getKakaoLoginLink()
    return (
        <>

            <MainHeader />
            <div className="max-w-screen-xl  mx-auto p-14">

            <div className="relative flex flex-col justify-center overflow-hidden p-4">
                <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
                    <h1 className="text-3xl font-semibold text-center text-gray-700">Login</h1>
                    <form className="space-y-4">
                        <div className="w-full pt-6">
                            <Link to ={link} className="btn btn-warning w-full border-inherit bg-yellow-300 text-base font-bold text-opacity-70" style={{backgroundcolor: '#fee500'}}>카카오 로그인</Link>
                        </div>
                        <Link to={'/owner/login'} className="text-xs text-gray-600 hover:underline hover:text-blue-600 grid justify-end">사업자 회원이십니까?</Link>
                 
                    </form>
                </div>
            </div>
    
                <div className="mx-auto w-fit">
                    
                </div>
            </div>

          

        </>
    );
}
export default LoginPage;