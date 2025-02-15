import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { PlantProvider } from "./components/AppContext/Context"; // Import the context provider
import ErrorBoundary from "./components/Pages/ErrorBoundary";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import { AppRouters } from "./components/AppRoutes/AppRouters";
import PlantPageSkeleton from "./components/Pages/PlantPageSkeleton";


const App = () => {
  return (
    <ErrorBoundary>
      <PlantProvider>
        <Suspense fallback={<PlantPageSkeleton />}>
          <RouterProvider router={AppRouters} />
        </Suspense>
        <Toaster />
        <ToastContainer />
      </PlantProvider>
    </ErrorBoundary>
  );
};

export default App;
