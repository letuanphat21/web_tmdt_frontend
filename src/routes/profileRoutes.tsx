import UserNotification from "@/pages/UserNotification";
import UserProfile from "@/pages/UserProfile";
import UserPromotion from "@/pages/UserPromotion";
import UserSellOrder from "@/pages/UserSellOrder";
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
  {
    path: "promotions",
    element: <UserPromotion />,
  },
  {
    path: "sell-orders",
    element: <UserSellOrder />,
  },
];

export default profileRoutes;
