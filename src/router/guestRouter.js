// boardRouter.js
import { Suspense, lazy } from "react";

const Login = lazy(() => import("../pages/member/user/LoginPage.js"));
const Logout = lazy(() => import("../pages/member/Logout.js"));
const GroundInfoPage = lazy(() => import("pages/reserve/user/GroundInfoPage.js"))
const BoardList = lazy(() => import("pages/board/UserListPage.js"));


const guestRouter = () => {
  return [
  //   {
  //     path: "login",
  //     element: <Login />
  // },
  // {
  //     path: "logout",
  //     element: <Logout />
  // },
  {
    path: "ground/:gno",
    element: <GroundInfoPage />
  },
  {
    path: "notice",
    element: <BoardList />
},
  ];
};

export default guestRouter;
