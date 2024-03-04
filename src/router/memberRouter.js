import { Suspense, lazy } from "react";
const Loading = <div>Loading....</div>
const Login = lazy(() => import("../pages/member/UserLoginPage"))
const Logout = lazy(() => import("../pages/member/UserLogoutPage"))

const memberRouter = () => {
    return [
        {
            path: "login",
            element: <Suspense fallback={Loading}><Login /></Suspense>
        },
        {
            path: "logout",
            element: <Suspense fallback={Loading}><Logout /></Suspense>
        }

    ]
}
export default memberRouter
