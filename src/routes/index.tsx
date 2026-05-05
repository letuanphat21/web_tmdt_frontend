import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import publicRoutes from "./publicRoutes";
import ProfileLayout from "@/layouts/ProfileLayout/ProfileLayout";
import ProfileRoute from "./ProfileRoute";
import profileRoutes from "./profileRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      ...publicRoutes,
      {
        element: <ProfileRoute />,
        children: [
          {
            path: "profile",
            element: <ProfileLayout />,
            children: profileRoutes,
          },
        ],
      },
    ],
  },
]);

export default router;
