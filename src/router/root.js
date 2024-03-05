import { Suspense, lazy } from "react";
<<<<<<< HEAD
=======
import memberRouter from "./memberRouter.js";
>>>>>>> d2479d19f7bc9dda5185ca1e1b8edf12c6a557da

const { createBrowserRouter } = require("react-router-dom");

const Loading = <div>Loading....</div>
const Main = lazy(() => import("../pages/MainPage"))

const root = createBrowserRouter([
    {
        path: ""
        ,
        element: <Suspense fallback={Loading}><Main /></Suspense>
<<<<<<< HEAD
=======
    },
    { 
        path: "member",
        children: memberRouter()
>>>>>>> d2479d19f7bc9dda5185ca1e1b8edf12c6a557da
    }
])

export default root;