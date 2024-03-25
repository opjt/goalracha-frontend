import { Suspense, lazy } from "react";
import groundRouter from "./groundRouter.js";

const Loading = <div>Loading....</div>
const Login = lazy(() => import("pages/member/owner/LoginOwnerPage.js"))
const Join = lazy(() => import("pages/member/owner/OwnerJoinPage.js"))
const Mypage = lazy(() => import("../pages/member/owner/OwnerMyPage.js"))
const OwnerReserveList = lazy(() => import("pages/reserve/owner/OwnerReserveListPage"))
const OwnerStatistics = lazy(() => import("pages/reserve/owner/OwnerStatisticsPage"))


const ownerRouter = () => {
    return [
        {
            path: "login",
            element: <Login />
        },
        {
            path: "join",
            element: <Join />
        },
        {
            path: "ground",
            children: groundRouter()
        }, 
        {
            path: "mypage",
            element: <Mypage />
        },
        {
            path: "reserve/list",
            element: <OwnerReserveList />
        },
        {
            path: "statistics",
            element: <OwnerStatistics />
        },

    ]
}
export default ownerRouter
