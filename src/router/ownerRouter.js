import { Suspense, lazy } from "react";
const Loading = <div>Loading....</div>
const Login = lazy(() => import("pages/member/owner/OwnerLoginPage"))
const Join = lazy(() => import("pages/member/owner/OwnerJoinPage"))

const memberRouter = () => {
    return [
        {
            path: "login",
            element: <Suspense fallback={Loading}><Login /></Suspense>
        },
        {
            path: "join",
            element: <Suspense fallback={Loading}><Join /></Suspense>
        },

    ]
}
export default memberRouter
