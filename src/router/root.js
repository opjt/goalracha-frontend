import { Suspense, lazy } from "react";
import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";

import memberRouter from "./userRouter.js";
import ownerRouter from "./ownerRouter.js";
import groundRouter from "./groundRouter.js";
import BoardRouter from "./boardRouter.js";
import adminRouter from "./adminRouter"; // adminRouter를 불러옵니다.

import MainHeader from "../components/layouts/mainHeader";
import AdminLogin from "../components/member/admin/AdminLoginComponent"; //admin 로그인 페이지

const Loading = <div>Loading....</div>;
const Main = lazy(() => import("../pages/MainPage"));
const Login = lazy(() => import("../pages/member/user/LoginPage.js"));
const GroundInfoPage = lazy(() => import("pages/reserve/user/GroundInfoPage.js"))
const GroundListPage = lazy(() => import("pages/reserve/user/GroundListPage"));
const BoardIndex = lazy(() => import("pages/board/IndexPage.js"));

const root = createBrowserRouter([
    {
        path: "/",
        element: (
        <Suspense fallback={Loading}>
            <Main />
        </Suspense>
        ),
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
        element: (
        <Suspense fallback={Loading}>
            <GroundListPage />
        </Suspense>
        ),
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
        element: (
        <Suspense fallback={Loading}>
            <BoardIndex />
        </Suspense>
        ),
        children: BoardRouter(),
    },
    ...adminRouter(), // adminRouter 함수를 호출하여 라우트 배열을 펼침
]);

export default root;
