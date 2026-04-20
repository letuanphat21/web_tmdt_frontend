import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function UserLayout() {
  return (
    <>
      <Header />
      {/* <SubHeader /> */}
      <div className="w-full bg-[#ebebeb]">
        <div className="max-w-7xl mx-60 py-8 bg-white px-3">
          <Outlet />
        </div>
      </div>

      <footer>Footer</footer>
    </>
  );
}

export default UserLayout;
