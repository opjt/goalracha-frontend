import { Suspense, lazy } from "react";

import memberRouter from "./userRouter.js";
import ownerRouter from "./ownerRouter.js"
import groundRouter from "./groundRouter.js"
import AdminLogin from "../components/member/admin/AdminLoginComponent"; //admin 로그인 페이지
import AdminPage from '../pages/member/admin/AdminPage.js'; // admin로그인 성공후 페이지
import BoardRouter from "./boardRouter.js";

const { createBrowserRouter } = require("react-router-dom");

const Loading = <div>Loading....</div>
const Main = lazy(() => import("../pages/MainPage"))
const Ground = lazy(() => import("../pages/reserve/user/IndexPage.js"))
const Login = lazy(() => import("../pages/member/user/LoginPage.js"))
const GroundListPage = lazy(() => import("pages/reserve/user/GroundListPage.js"))
const GroundInfoPage = lazy(() => import("pages/reserve/user/GroundInfoPage.js"))
const BoardIndex = lazy(() => import("pages/board/IndexPage.js"))

const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Main /></Suspense>
    },
    {
        path: "login",
        element: <Suspense fallback={Loading}><Login /></Suspense>
    },
    {
        path: "reserve",
        element: <Suspense fallback={Loading}><GroundListPage /></Suspense>
    },
    {
        path: "ground/:gno",
        element: <Suspense fallback={Loading}><GroundInfoPage /></Suspense>,
    },
    { 
        path: "user",
        children: memberRouter()
    },
    { 
        path: "owner",
        children: ownerRouter()
    },
    {
        path: "/admin/login",
        element: <AdminLogin />,
    },
    {
        path: "/AdminPage",
        element: <AdminPage />,
    },
    {
      path : "board",
      element : <Suspense fallback = {Loading}><BoardIndex/></Suspense>,
      children : BoardRouter()
    }
    

])

export default root;