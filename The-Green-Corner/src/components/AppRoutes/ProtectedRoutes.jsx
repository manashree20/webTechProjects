import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Context } from "../AppContext/Context"; // Import your context

const ProtectedRoute = () => {
    const { loggedInUser } = useContext(Context);

    return loggedInUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
