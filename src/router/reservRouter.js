import { Suspense, lazy } from "react";

const Loading = <div>Loading....</div>;

const GroundListPage = lazy(() => import("pages/reserve/user/GroundListPage"));
const Success = lazy(() => import("pages/reserve/user/ReservSuccess"));
const Fail = lazy(() => import("pages/reserve/user/ReservFail"));
const UserPreviousReservations = lazy(() => import("pages/reserve/user/UserPreviousReservationsPage"));
const UserReservationStatus = lazy(() => import("pages/reserve/user/ReserveList"))
const AdminReserveList = lazy(() => import("pages/reserve/admin/AdminReserveListPage"))

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
        },
        {
            path: "list",
            element: <UserReservationStatus />
        },
        
        // {
        //     path: "list",
        //     element: <AdminReserveList />
        // }
        
    ];
};

export default reservRouter;