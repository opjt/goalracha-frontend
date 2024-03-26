import { Suspense, lazy } from "react";
import groundRouter from "./groundRouter.js";

const Loading = <div>Loading....</div>
const Login = lazy(() => import("pages/member/user/LoginPage.js"))
const Join = lazy(() => import("pages/member/owner/OwnerJoinPage.js"))
const Mypage = lazy(() => import("../pages/member/owner/OwnerMyPage.js"))
const BoardList = lazy(() => import("pages/board/UserListPage.js"));
const OwnerReserveList = lazy(() => import("pages/reserve/owner/OwnerReserveListPage.js"))
const OwnerStatistics = lazy(() => import("pages/reserve/owner/OwnerStatisticsPage.js"))


const ownerRouter = () => {
    return [
        {
            path: "ground",
            children: groundRouter()
        }, 
        {
            path: "mypage",
            element: <Mypage />
        },
        {
            path: "notice",
            element: <BoardList />
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
