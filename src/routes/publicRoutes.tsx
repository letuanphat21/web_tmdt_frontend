import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

const publicRoutes = [
    {
        index: true,
        element: <Home />,
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "register",
        element: <Register />,
    },
];

export default publicRoutes;