// src/routes/adminRouter.js
import React, { lazy } from "react";
import { Outlet } from "react-router-dom";

import MainHeader from "../components/layouts/mainHeader";
import TopNavAdmin from "../components/layouts/topnavadmin";

import AdminGroundListPage from "../pages/member/admin/AdminGroundListPage.js";
import AdminReserveListPage from "../pages/member/admin/AdminReserveListPage.js";
import AdminOwnerManagePage from "../pages/member/admin/AdminOwnerManagePage.js";
import AdminUserManagePage from "../pages/member/admin/AdminUserManagePage.js";
import AdminAnnualStatistics from "pages/member/admin/AdminMemberStatistics.js";
import AdminMonthlyStatistics from "pages/member/admin/AdminReserveStatistics.js";

const AdminPage = lazy(() => import("../pages/member/admin/AdminPage"));

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
        { path: "submenu7-url", element: <AdminAnnualStatistics /> }, 
      ],
    },
  ];
}
