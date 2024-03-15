import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import root from "./router/root";
import LoadingPage from "pages/loading";

function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={root} />
    </Suspense>
  );
}

export default App;