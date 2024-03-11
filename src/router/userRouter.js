import { Suspense, lazy } from "react";
const Loading = <div>Loading....</div>
const Login = lazy(() => import("../pages/member/user/LoginPage"))
const Logout = lazy(() => import("../pages/member/user/UserLogoutPage"))
const KakaoRedirect = lazy(() => import("../pages/member/user/KakaoRedirectPage"))
const Join = lazy(() => import("../pages/member/user/UserJoinPage"))
const UserMyPage = lazy(() => import("../pages/member/user/UserMyPage"))

const memberRouter = () => {
    
    return [
        {
            path: "login",
            element: <Suspense fallback={Loading}><Login /></Suspense>
        },
        {
            path: "logout",
            element: <Suspense fallback={Loading}><Logout /></Suspense>
        },
        {
            path: "kakao",
            element: <Suspense fallback={Loading}><KakaoRedirect /></Suspense>
        },
        {
            path: "join",
            element: <Suspense fallback={Loading}><Join /></Suspense>
        },
        {
            path: "mypage",
            element: <Suspense fallback={Loading}><UserMyPage /></Suspense>
        },
        

    ]
}
export default memberRouter
