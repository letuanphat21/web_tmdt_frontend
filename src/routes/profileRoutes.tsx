import UserNotification from "@/pages/UserNotification";
import UserProfile from "@/pages/UserProfile";
import UserWallet from "@/pages/UserWallet/UserWallet";

const profileRoutes = [
  {
    path: "information",
    element: <UserProfile />,
  },
  {
    path: "wallet",
    element: <UserWallet />,
  },
  { path: "notifications", element: <UserNotification /> },
];

export default profileRoutes;
