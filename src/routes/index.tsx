import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import publicRoutes from "./publicRoutes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout />,
        children: publicRoutes,
    },
]);

export default router;