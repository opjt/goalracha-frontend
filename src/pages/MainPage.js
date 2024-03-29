import { Link, Outlet } from "react-router-dom";
import { getKakaoLoginLink } from "../api/kakaoAPI";
import useCustomLogin from "hooks/useCustomLogin";
import BasicLayout from "../layouts/BasicLayout";
import { useEffect } from "react";




const MainPage = () => {
    const { isLogin, loginState,moveToPath} = useCustomLogin();
    useEffect(() => {
        console.log(loginState);
        var moveUrl ="/reserve"
        if(loginState.type =="OWNER") {
            moveUrl = "/owner/ground"
        } 
        if(loginState.type=="ADMIN") {
            moveUrl = "/adminPage"
        }
        moveToPath(moveUrl)
    })

    const link = getKakaoLoginLink()
    return (
        <BasicLayout>

        <div className="max-w-screen-xl mx-auto text-xl" style={{height:'400px'}}>
            <div className="">
                {!loginState.email ?
                    <div>
                    <Link to={'/admin/login'}>관리자 로그인</Link> <br />
                    <Link to={'/user/login'}>Login</Link> <br />
                    <Link to={link}>카카오 로그인</Link>
                    </div>
                    
                    :
                    <div>
                        <div> {loginState.email} </div>
                        <Link to={'/user/logout'}>Logout</Link>
                    </div>
                }
            </div>
            <br />
            메인 페이지 입니다<br></br>
            <Link to={'/reserve'}>구장예약목록</Link>
        </div>
            
                <Outlet/>
        
        </BasicLayout>
    );
}
export default MainPage;