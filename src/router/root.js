import { Suspense, lazy } from "react";
import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import memberRouter from "./userRouter.js";
import ownerRouter from "./ownerRouter.js";
import groundRouter from "./groundRouter.js";
import BoardRouter from "./boardRouter.js";

import MainHeader from '../components/layouts/mainHeader'; 
import TopNavAdmin from '../components/layouts/topnavadmin';
import AdminLogin from "../components/member/admin/AdminLoginComponent"; //admin 로그인 페이지
import AdminPage from "../pages/member/admin/AdminPage.js"; // admin로그인 성공후 페이지

import UnauthorizedStadiumPage from "../pages/member/admin/UnauthorizedStadiumPage.js";
import AdminGroundListPage from '../pages/member/admin/AdminGroundListPage.js';
import AdminReserveListPage from "../pages/member/admin/AdminReserveListPage.js";
import AdminOwnerManagePage from "../pages/member/admin/AdminOwnerManagePage.js";
import AdminUserManagePage from "../pages/member/admin/AdminUserManagePage.js";
import AdminAnnualStatistics from "pages/member/admin/AdminAnnualStatistics.js";
import AdminMonthlyStatistics from "pages/member/admin/AdminMonthlyStatistics.js";

const Loading = <div>Loading....</div>
const Main = lazy(() => import("../pages/MainPage"))
const Ground = lazy(() => import("../pages/ground/user/IndexPage"))
const Login = lazy(() => import("../pages/member/user/LoginPage.js"))
const GroundListPage = lazy(() => import("pages/ground/user/GroundListPage"))
const BoardIndex = lazy(() => import("pages/board/IndexPage.js"))

const AdminLayout = () => (
    <>
      <MainHeader />
      <TopNavAdmin />
      <Outlet /> 
    </>
  );

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
    path: "ground",
    element: (
      <Suspense fallback={Loading}>
        <Ground />
      </Suspense>
    ),
    children: groundRouter(),
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
    path: "/adminPage",
    element: <AdminLayout />, // AdminLayout이 기본 레이아웃으로 사용됩니다.
    children: [
      { path: "", element: <AdminPage /> }, // 기본 AdminPage 뷰
      { path: "submenu1-url", element: <UnauthorizedStadiumPage /> }, 
      { path: "submenu2-url", element: <AdminGroundListPage /> }, 
      { path: "submenu3-url", element: <AdminReserveListPage /> },
      { path: "submenu4-url", element: <AdminOwnerManagePage /> },
      { path: "submenu5-url", element: <AdminUserManagePage /> },
      { path: "submenu6-url", element: <AdminAnnualStatistics /> },
      { path: "submenu7-url", element: <AdminMonthlyStatistics /> }
      
    ],
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
]);

export default root;
