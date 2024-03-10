import { Suspense, lazy } from "react";
import groundRouter from "./groundRouter.js";

const Loading = <div>Loading....</div>
const Login = lazy(() => import("pages/member/owner/OwnerLoginPage.js"))
const Join = lazy(() => import("pages/member/owner/OwnerJoinPage.js"))

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
        {
            path: "ground",
            children: groundRouter()
        },

    ]
}
export default memberRouter
