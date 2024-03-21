import { Suspense, lazy } from "react";

const Loading = <div>Loading....</div>;

const GroundListPage = lazy(() => import("pages/reserve/user/GroundListPage"));
const Success = lazy(() => import("pages/reserve/user/ReservSuccess"));
const Fail = lazy(() => import("pages/reserve/user/ReservFail"));
const UserPreviousReservations = lazy(() => import("pages/reserve/user/UserPreviousReservationsPage"));
const UserReservationStatus = lazy(() => import("pages/reserve/user/UserReservationStatusPage"))
const OwnerReserveList = lazy(() => import("pages/reserve/owner/OwnerReserveListPage"))
const AdminReserveList = lazy(() => import("pages/reserve/admin/AdminReserveListPage"))
const OwnerStatistics = lazy(() => import("pages/reserve/owner/OwnerStatisticsPage"))

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
            path: "PreviousReservations",
            element: <UserPreviousReservations />
        },
        {
            path: "ReservationStatus",
            element: <UserReservationStatus />
        },
        {
            path: "OwnerReserveList",
            element: <OwnerReserveList />
        },
        {
            path: "list",
            element: <AdminReserveList />
        },
        {
            path: "owner/statistics",
            element: <OwnerStatistics />
        },
    ];
};

export default reservRouter;