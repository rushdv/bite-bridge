import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ErrorPage from "../components/Shared/ErrorPage";
import AvailableFoods from "../pages/Foods/AvailableFoods";
import FoodDetails from "../pages/Foods/FoodDetails";
import AddFood from "../pages/Dashboard/AddFood";
import ManageMyFoods from "../pages/Dashboard/ManageMyFoods";
import MyFoodRequests from "../pages/Dashboard/MyFoodRequests";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/available-foods",
                element: <AvailableFoods />
            },
            {
                path: "/food/:id",
                element: <PrivateRoute><FoodDetails /></PrivateRoute>
            },
            {
                path: "/add-food",
                element: <PrivateRoute><AddFood /></PrivateRoute>
            },
            {
                path: "/manage-my-foods",
                element: <PrivateRoute><ManageMyFoods /></PrivateRoute>
            },
            {
                path: "/my-food-requests",
                element: <PrivateRoute><MyFoodRequests /></PrivateRoute>
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    }
]);

export default router;
