import { Suspense, lazy } from "react";

import memberRouter from "./userRouter.js";
import ownerRouter from "./ownerRouter.js"
import groundRouter from "./groundRouter.js"
import AdminLogin from "../components/member/admin/AdminLoginComponent"; //admin 로그인 페이지
import AdminPage from '../pages/member/admin/AdminPage.js'; // admin로그인 성공후 페이지

const { createBrowserRouter } = require("react-router-dom");

const Loading = <div>Loading....</div>
const Main = lazy(() => import("../pages/MainPage"))
const Ground = lazy(() => import("../pages/ground/user/IndexPage"))
const Login = lazy(() => import("../pages/member/user/LoginPage.js"))



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
        path: "ground",
        element: <Suspense fallback={Loading}><Ground /></Suspense>,
        children: groundRouter()
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
])

export default root;