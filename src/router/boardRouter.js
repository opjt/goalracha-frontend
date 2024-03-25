// boardRouter.js
import { Suspense, lazy } from "react";

const Loading = <div>Loading....</div>;
const BoardList = lazy(() => import("../pages/board/UserListPage"));
const BoardRead = lazy(() => import("../pages/board/ReadPage"));
const BoardAdd = lazy(() => import("../pages/board/AddPage"));
const BoardModify = lazy(() => import("../pages/board/ModifyPage"));
const BoardPage = lazy(() => import("../pages/board/AdminListPage"));

const boardRouter = () => {
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={Loading}>
          <BoardList />
        </Suspense>
      ),
    },
    {
      path: "read/:bno",
      element: <Suspense fallback={Loading}><BoardRead /></Suspense>
    },
    {
      path: "add",
      element: (
        <Suspense fallback={Loading}>
          <BoardAdd />
        </Suspense>
      ),
    },
    {
      path: "modify/:bno",
      element: (
        <Suspense fallback={Loading}>
          <BoardModify />
        </Suspense>
      ),
    },
    {
      path: "board",
      element: (
        <Suspense fallback={Loading}>
          <BoardPage />
        </Suspense>
      ),
    },
  ];
};

export default boardRouter;
