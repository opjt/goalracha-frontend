import useCustomLogin from "hooks/useCustomLogin";
import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
const Login = lazy(() => import("../pages/member/user/LoginPage"))
const Logout = lazy(() => import("../pages/member/user/UserLogoutPage"))
const KakaoRedirect = lazy(() => import("../pages/member/user/KakaoRedirectPage"))
const Join = lazy(() => import("../pages/member/user/UserJoinPage"))
const UserMyPage = lazy(() => import("../pages/member/user/UserMyPage"))

// const ReserveList = lazy(() => import("../pages/member/user/UserReserveListPage"))

const MemberRouter = () => {

    return [
        {
            path: "login",
            element: <Login />
        },
        {
            path: "logout",
            element: <Logout />
        },
        {
            path: "kakao",
            element: <KakaoRedirect />
        },
        {
            path: "join",
            element: <Join />
        },
        {
            path: "mypage",
            element: <UserMyPage />
            // element: isLogin ? <UserMyPage /> : <Navigate to="/user/login" />
        }
        // , 
        // {
        //     path: "reserve-list",
        //     element: <Suspense fallback={Loading}><ReserveList /></Suspense>
        // },



    ];
};
export default MemberRouter
