import { Suspense, lazy } from "react";
import BoardRouter from "./boardRouter";
const { createBrowserRouter } = require("react-router-dom");
const Loading = <div>Loading....</div>;
const Main = lazy(() => import("../pages/MainPage"));
const About = lazy(() => import("../pages/AboutPage"));
const BoardIndex = lazy(() => import("../pages/board/IndexPage"))


const root = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: "about",
    element: (
      <Suspense fallback={Loading}>
        <About />
      </Suspense>
    ),
  },
  {
    path : "board",
    element : <Suspense fallback = {Loading}><BoardIndex/></Suspense>,
    children : BoardRouter()
  }
])
export default root;
