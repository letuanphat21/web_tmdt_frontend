import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function AdminRoute() {
  const user = useSelector((state: any) => state.auth.user);
  const roles = user?.role || [];

  return roles.includes("ROLE_ADMIN") ? (
    <Outlet />
  ) : (
    <Navigate to="/not-permission" replace />
  );
}

export default AdminRoute;
