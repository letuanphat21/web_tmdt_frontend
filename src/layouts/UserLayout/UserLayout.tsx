import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function UserLayout() {
  return (
    <>
      <Header />
      <div className="">
        <div className="">
          <Outlet />
        </div>
      </div>

      <footer>Footer</footer>
    </>
  );
}

export default UserLayout;
