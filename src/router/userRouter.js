import useCustomLogin from "hooks/useCustomLogin";
import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
const Login = lazy(() => import("../pages/member/user/LoginPage"))
const Logout = lazy(() => import("../pages/member/user/UserLogoutPage"))
const KakaoRedirect = lazy(() => import("../pages/member/user/KakaoRedirectPage"))
const Join = lazy(() => import("../pages/member/user/UserJoinPage"))
const UserMyPage = lazy(() => import("../pages/member/user/UserMyPage"))
const ReserveInfo = lazy(() => import("../pages/reserve/user/ReserveInfo"))

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
            path: "reserve",
            element: <ReserveInfo/>
        },
        {
            path: "mypage",
            element: <UserMyPage />
            // element: isLogin ? <UserMyPage /> : <Navigate to="/user/login" />
        },
    ];
};
export default MemberRouter
