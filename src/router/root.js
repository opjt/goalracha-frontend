import { Suspense, lazy } from "react";
import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";

import memberRouter from "./userRouter.js";
import ownerRouter from "./ownerRouter.js";
import BoardRouter from "./boardRouter.js";
import ReservRouter from "./reservRouter.js";
import adminRouter from "./adminRouter"; // adminRouter를 불러옵니다.

import AdminLogin from "../components/member/admin/AdminLoginComponent"; //admin 로그인 페이지

const Loading = <div>Loading....</div>;
const Main = lazy(() => import("../pages/MainPage"));
const Test = lazy(() => import("../pages/test"));
const Login = lazy(() => import("../pages/member/user/LoginPage.js"));
const GroundInfoPage = lazy(() => import("pages/reserve/user/GroundInfoPage.js"))
const LoadingPage = lazy(() => import("pages/loading"))

const BoardIndex = lazy(() => import("pages/board/IndexPage.js"));


const root = createBrowserRouter([
    {
        path: "test",
        element: (
        <Suspense fallback={Loading}>
            <Test />
        </Suspense>
        ),
    },
    {
        path: "/",
        element: (
            <Main />
        ),
    },
    {
        path: "loading",
        element:  <LoadingPage />

    },
    {
        path: "login",
        element: (
        <Suspense fallback={Loading}>
            <Login />
        </Suspense>
        ),
    },
    {
        path: "reserve",
        children: ReservRouter()
    },
    {
        path: "ground/:gno",
        element: <Suspense fallback={Loading}><GroundInfoPage /></Suspense>,
    },

    {
        path: "user",
        children: memberRouter(),
    },
    {
        path: "owner",
        children: ownerRouter(),
    },
    {
        path: "/admin/login",
        element: <AdminLogin />,
    },
    {
        path: "board",
        element: <BoardIndex />,
        children: BoardRouter(),
    },
    ...adminRouter(), // adminRouter 함수를 호출하여 라우트 배열을 펼침
]);

export default root;
