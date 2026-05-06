import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Checkout from "@/pages/Checkout";
import ProductDetail from "@/pages/ProductDetail";

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
    {
        path: "/checkout",
        element: <Checkout />
    },
    {
        path: "/product/:id",
        element: <ProductDetail />
    }
];

export default publicRoutes;