import React, { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useCustomLogin from "../hooks/useCustomLogin"; 


import MainHeader from "../components/layouts/mainHeader";
import TopNavAdmin from "../components/layouts/topnavadmin";

import GroundListPage from "../pages/member/admin/GroundListPage.js";
import ReserveListPage from "../pages/member/admin/ReserveListPage.js";
import OwnerManagePage from "../pages/member/admin/OwnerManagePage.js";
import UserManagePage from "../pages/member/admin/UserManagePage.js";
import ReserveStatisticsPage from "pages/member/admin/ReserveStatisticsPage.js";
import MemberStatisticsPage from "pages/member/admin/MemberStatisticsPage.js";
import SalesStatisticsPage from "pages/member/admin/SalesStatisticsPage.js";

const AdminPage = lazy(() => import("../pages/member/admin/AdminPage"));

const BoardList = lazy(() => import("../pages/board/AdminListPage"));
const BoardRead = lazy(() => import("../pages/board/ReadPage"));
const BoardAdd = lazy(() => import("../pages/board/AddPage"));
const BoardModify = lazy(() => import("../pages/board/ModifyPage"));

const AdminLayout = () => {
  const { isLogin,loginState } = useCustomLogin();

    // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    if(loginState.type != "ADMIN") {
      return <Navigate to="/admin/login" replace />;
    }
    

  return (
    <>
      <MainHeader />
      <TopNavAdmin />
      <Outlet />
    </>
  );
};


// adminRouter를 함수로 변경합니다. 이렇게 하면 동적으로 라우트 설정을 생성하고 반환할 수 있습니다.
export default function adminRouter() {
  return [
    {
      path: "adminPage",
      element: <AdminLayout />,
      children: [
        { path: "", element: <AdminPage /> },
        { path: "GroundListPage", element: <GroundListPage /> }, 
        { path: "ReserveListPage", element: <ReserveListPage /> }, 
        { path: "OwnerManagePage", element: <OwnerManagePage /> }, 
        { path: "UserManagePage", element: <UserManagePage /> }, 
        { path: "ReserveStatisticsPage", element: <ReserveStatisticsPage /> }, 
        { path: "MemberStatisticsPage", element: <MemberStatisticsPage /> }, 
        { path: "SalesStatisticsPage", element: <SalesStatisticsPage /> }, 
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
