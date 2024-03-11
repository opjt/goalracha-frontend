import { Suspense, lazy } from "react";
import groundRouter from "./groundRouter.js";

const Loading = <div>Loading....</div>
const Login = lazy(() => import("pages/member/owner/LoginOwnerPage.js"))
const Join = lazy(() => import("pages/member/owner/OwnerJoinPage.js"))
const Ground = lazy(() => import("../pages/owner/ground/IndexPage.js"))

const ownerRouter = () => {
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
            element: <Suspense fallback={Loading}><Ground /></Suspense>,
            children: groundRouter()
        },

    ]
}
export default ownerRouter
