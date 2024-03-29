import { Suspense, lazy } from "react";
import React from "react";
import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";

import MemberRouter from "./userRouter.js";
import ownerRouter from "./ownerRouter.js";
import GuestRouter from "./guestRouter.js";
import ReservRouter from "./reservRouter.js";
import adminRouter from "./adminRouter"; // adminRouter를 불러옵니다.
import OwnerIndex from "pages/owner/IndexPage.js"
import GuestIndex from "pages/GuestIndex.js"
import AdminLogin from "../components/member/admin/AdminLoginComponent"; //admin 로그인 페이지
import NotFound from "pages/404page.js";
const Main = lazy(() => import("../pages/MainPage"));



const root = createBrowserRouter([
    // {
    //     path: "test",
    //     element: <Test/>,
    // },
    {
        path: "/*",
        element: <NotFound />
    },
    {
        path: "/",
        element: <Main />
    },
    {
        path: "/",
        element: <GuestIndex />,
        children: GuestRouter(),
    },
    {
        path: "reserve",
        children: ReservRouter()
    },
    {
        path: "user",
        children: MemberRouter(),
    },
    {
        path: "owner",
        element: <OwnerIndex />,
        children: ownerRouter(),
    },
    {
        path: "/admin/login",
        element: <AdminLogin />,
    },


    ...adminRouter(), // adminRouter 함수를 호출하여 라우트 배열을 펼침
]);

export default root;
