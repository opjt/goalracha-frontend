import { Suspense, lazy } from "react";

const Loading = <div>Loading....</div>;

const GroundList = lazy(() => import("../pages/owner/ground/GroundListPage.js"))
const GroundRead = lazy(() => import("../pages/owner/ground/GroundReadPage"));
const GroundRegister = lazy(() => import("../pages/owner/ground/GroundRegisterPage"));
const GroundModify = lazy(() =>  import("pages/owner/ground/GroundModifyPage.js"))

const groundRouter = () => {
    return [
        {
            path: "",
            element: <Suspense fallback={Loading}><GroundList /></Suspense>
        },
        {
            path: "read/:gno",
            element: <Suspense fallback={Loading}><GroundRead /></Suspense>
        },
        {
            path: "register",
            element: <Suspense fallback={Loading}><GroundRegister /></Suspense>
        },
        {
            path: "modify/:gno",
            element: <Suspense fallback={Loading}><GroundModify /></Suspense>
        }
    ];
};

export default groundRouter;
