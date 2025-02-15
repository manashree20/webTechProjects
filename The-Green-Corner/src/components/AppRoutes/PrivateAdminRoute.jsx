import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Context } from "../AppContext/Context"; // Import your context

const PrivateAdminRoute = () => {
    const { loggedInUser } = useContext(Context);

    return loggedInUser && loggedInUser.isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateAdminRoute;
