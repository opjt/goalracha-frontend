import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import BasicLayout from "../layouts/BasicLayout";



const MainPage = () => {
    const loginState = useSelector(state => state.loginSlice);
    console.log(loginState);
    return (
        <BasicLayout>

        <div className="max-w-screen-xl mx-auto text-xl" style={{height:'400px'}}>
            <div className="">
                {!loginState.email ?
                    <Link to={'/member/login'}>Login</Link>
                    :
                    <div>
                        <div> {loginState.email} </div>
                        <Link to={'/member/logout'}>Logout</Link>
                    </div>
                    
                }
            </div>
            메인 페이지 입니다
        </div>
            
    
        
        </BasicLayout>
    );
}
export default MainPage;