import Hero from "./sections/Hero";
import Categories from "./sections/Categories";
import ProductSection from "./sections/ProductSection";
import SellerSection from "./sections/SellerSection";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import authSlice from "@/redux/authSlice/authSlice";
import { jwtDecode } from "jwt-decode";
import type Token from "@/model/Token";
import type User from "@/model/User";

const Home = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useDispatch();
  if (token) {
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode(token) as Token;
    let userInfo: User = {
      email: decodedToken.sub,
      role: decodedToken.roles,
      token: decodedToken,
    };
    dispatch(authSlice.actions.login(userInfo));
    // Xóa ?token= khỏi URL để không lộ token trong browser history
    window.history.replaceState({}, document.title, "/");
  }

  return (
    <div className="flex flex-col gap-5">
      <Hero />

      <Categories />

      <ProductSection title="Sản phẩm mới đăng" />
      <ProductSection title="Sản phẩm bán chạy nhất" />

      <SellerSection />
    </div>
  );
};

export default Home;
