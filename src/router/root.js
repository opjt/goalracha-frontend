import { Suspense, lazy } from "react";
import memberRouter from "./userRouter.js";
import ownerRouter from "./ownerRouter.js"

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
        path: "user",
        children: memberRouter()
    },
    { 
        path: "owner",
        children: ownerRouter()
    }
])

export default root;