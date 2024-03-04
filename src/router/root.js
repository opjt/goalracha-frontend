import { Suspense, lazy } from "react";
import memberRouter from "./memberRouter.js";

const { createBrowserRouter } = require("react-router-dom");

const Loading = <div>Loading....</div>
const Main = lazy(() => import("../pages/MainPage"))

const root = createBrowserRouter([
    {
        path: ""
        ,
        element: <Suspense fallback={Loading}><Main /></Suspense>
    },
    { 
        path: "member",
        children: memberRouter()
    }
])

export default root;