import React from "react";
import { createBrowserRouter } from "react-router-dom";

// Lazy load components
const OutletPage = React.lazy(() => import("../OutletPage"));
const HomePage = React.lazy(() => import("../Pages/HomePage/HomePage"));
const AboutPage = React.lazy(() => import("../Pages/AboutPage/AboutPage"));
const ContactPage = React.lazy(() => import("../Pages/ContactPage/ContactPage"));
const AllPlant = React.lazy(() => import("../Pages/AllPlantProducts/AllPlant"));
const Login = React.lazy(() => import("../Pages/LoginPage/Login"));
const SignUp = React.lazy(() => import("../Pages/SignupPage/SignUp"));
const Wishlist = React.lazy(() => import("../Pages/WishlistPage/Wishlist"));
const Cart = React.lazy(() => import("../Pages/CartPage/Cart"));
const PlantDescriptionPage = React.lazy(() => import("../Pages/ProductsDesc/PlantDescriptionPage"));
const AdminDashboard = React.lazy(() => import("../adminDashboard/AdminDashboard"));
const AddNewPlant = React.lazy(() => import("../../components/adminDashboard/AddNewPlant"));
const Checkout = React.lazy(() => import("../Pages/CheckOutPage/Checkout"));
const OrderConfirmation = React.lazy(() => import("../Pages/CheckOutPage/OrderConfirmation"));
const ProtectedRoute = React.lazy(() => import("../AppRoutes/ProtectedRoutes"));
const PrivateAdminRoute = React.lazy(() => import("../AppRoutes/PrivateAdminRoute"));
const PageNotFound = React.lazy(() => import("../Pages/PageNotFound"));

export let AppRouters = createBrowserRouter([
    {
        path: "/",
        element: <OutletPage />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/about",
                element: <AboutPage />
            },
            {
                path: "/contact",

                element: <ContactPage />
            },
            {
                path: "/products",
                element: <AllPlant />
            },
            {
                path: "/plantDesc",
                element: <PlantDescriptionPage />
            },

            {
                path: "/",
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/wishlist",
                        element: <Wishlist />
                    },
                    {
                        path: "/cart",
                        element: <Cart />
                    },
                    {
                        path: "/checkout",
                        element: <Checkout />
                    },
                    {
                        path: "/order-confirmation",
                        element: <OrderConfirmation />
                    },
                ],
            },

            {
                path: "/",
                element: <PrivateAdminRoute />,
                children: [
                    {
                        path: "/admin",
                        element: <AdminDashboard />
                    },
                    {
                        path: "addplant",
                        element: <AddNewPlant />
                    },
                ],
            },
        ],
    },

    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <SignUp />
    },
    {
        path: "*",
        element: <PageNotFound />
    },
]);
