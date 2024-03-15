import { Suspense, lazy } from "react";

const Loading = <div>Loading....</div>;

const GroundListPage = lazy(() => import("pages/reserve/user/GroundListPage"));
const Success = lazy(() => import("pages/reserve/user/ReservSuccess"));
const Fail = lazy(() => import("pages/reserve/user/ReservFail"));
const reservRouter = () => {
    return [
        {
            path: "",
            element: <GroundListPage />
        },
        {
            path: "success",
            element: <Success />
        },
        {
            path: "fail",
            element: <Fail />
        }
    ];
};

export default reservRouter;
