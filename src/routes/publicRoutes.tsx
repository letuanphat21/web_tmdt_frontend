import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Cart from "@/pages/Cart";
import Register from "@/pages/Register";
import Checkout from "@/pages/Checkout";
import ProductSearch from "@/pages/ProductSearch";
import ProductDetail from "@/pages/ProductDetail";
import UserSellingPost from "@/pages/UserSellingPost";

const publicRoutes = [
    {
        index: true,
        element: <Home/>,
    },
    {
        path: "login",
        element: <Login/>,
    },
    {
        path: "register",
        element: <Register/>,
    },
    {
        path: "checkout",
        element: <Checkout/>
    },
    {
        path: "search",
        element: <ProductSearch/>
    },
    {
        path: "cart",
        element: <Cart/>,
    },
    {
        path: "/product/:id",
        element: <ProductDetail/>
    },
    {
      path: "selling-post",
      element: <UserSellingPost/>
    },
];

export default publicRoutes;