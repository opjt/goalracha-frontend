// src/routes/adminRouter.js
import React, { lazy } from "react";
import { Outlet } from "react-router-dom";

import MainHeader from "../components/layouts/mainHeader";
import TopNavAdmin from "../components/layouts/topnavadmin";

import AdminGroundListPage from "../pages/member/admin/GroundListPage.js";
import AdminReserveListPage from "../pages/member/admin/ReserveListPage.js";
import AdminOwnerManagePage from "../pages/member/admin/OwnerManagePage.js";
import AdminUserManagePage from "../pages/member/admin/UserManagePage.js";
import AdminMonthlyStatistics from "pages/member/admin/ReserveStatistics.js";
import StatisticsPage from "pages/member/admin/MemberStatisticsPage.js";

const AdminPage = lazy(() => import("../pages/member/admin/AdminPage"));

const BoardList = lazy(() => import("../pages/board/ListPage"));
const BoardRead = lazy(() => import("../pages/board/ReadPage"));
const BoardAdd = lazy(() => import("../pages/board/AddPage"));
const BoardModify = lazy(() => import("../pages/board/ModifyPage"));


const AdminLayout = () => (
  <>
    <MainHeader />
    <TopNavAdmin />
    <Outlet />
  </>
);

// adminRouter를 함수로 변경합니다. 이렇게 하면 동적으로 라우트 설정을 생성하고 반환할 수 있습니다.
export default function adminRouter() {
  return [
    {
      path: "adminPage",
      element: <AdminLayout />,
      children: [
        { path: "", element: <AdminPage /> },
        { path: "submenu2-url", element: <AdminGroundListPage /> }, 
        { path: "submenu3-url", element: <AdminReserveListPage /> }, 
        { path: "submenu4-url", element: <AdminOwnerManagePage /> }, 
        { path: "submenu5-url", element: <AdminUserManagePage /> }, 
        { path: "submenu6-url", element: <AdminMonthlyStatistics /> }, 
        { path: "submenu7-url", element: <StatisticsPage /> }, 
        { path: "notice", children: [
          {path: ":bno" , element: <BoardRead/>},
          {path: "", element: <BoardList/>},
          {path: "add", element: <BoardAdd/>},
          {path: "modify/:bno", element: <BoardModify/>}
        ] }, 
      ],
    },
  ];
}
