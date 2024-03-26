// boardRouter.js
import { Suspense, lazy } from "react";

const Logout = lazy(() => import("../pages/member/Logout.js"));
const GroundInfoPage = lazy(() => import("pages/reserve/user/GroundInfoPage.js"))
const BoardList = lazy(() => import("pages/board/UserListPage.js"));
const PrivacyPolicyPage = lazy(() => import("pages/PrivacyPolicyPage.js"))
const TermsOfServicePage = lazy(() => import("pages/TermsOfServicePage.js"))
const OwnerJoin = lazy(() => import("pages/member/owner/OwnerJoinPage.js"))
const OwnerLogin = lazy(() => import("pages/member/owner/LoginOwnerPage.js"))
const Login = lazy(() => import("../pages/member/LoginPage"))

const guestRouter = () => {
  return [
    {
      path: "login",
      element: <Login />
  },
  {
      path: "logout",
      element: <Logout />
  },
  {
    path: "ground/:gno",
    element: <GroundInfoPage />
  },
  {
    path: "notice",
    element: <BoardList />
  },
  {
    path: "privacy-policy",
    element: <PrivacyPolicyPage />
},
{
    path: "terms-of-service",
    element: <TermsOfServicePage />
},
{
  path: "owner/login",
  element: <OwnerLogin />
},
{
  path: "owner/join",
  element: <OwnerJoin />
},
  ];
};

export default guestRouter;
