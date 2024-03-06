import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
const Loading = <div>Loading....</div>
const List = lazy(() => import("pages/ground/user/GroundListPage"))
const Index = lazy(() => import("pages/ground/user/IndexPage"))

const groundRouter = () => {
    return [
        {
            path: "list",
            element: <Suspense fallback={Loading}><List /></Suspense>
        }, {
            path: "",
            element: <Navigate replace to="/ground/list" />
        }
        


    ]
}
export default groundRouter
