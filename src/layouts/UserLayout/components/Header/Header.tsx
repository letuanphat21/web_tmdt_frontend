import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { Bell, Search, ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import UserDropdown from "./UserDropdown/UserDropdown";

const Header = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const cartCount = useSelector(
    (state: RootState) => state.cart.cart?.tongSoLuong ?? 0,
  );
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");

  // Sync header input with URL query param if we are on the /search page
  useEffect(() => {
    if (location.pathname === "/search") {
      setSearchValue(searchParams.get("query") || "");
    } else {
      setSearchValue("");
    }
  }, [location.pathname, searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchValue.trim();
    if (location.pathname === "/search") {
      const newParams = new URLSearchParams(searchParams);
      if (query) {
        newParams.set("query", query);
      } else {
        newParams.delete("query");
      }
      setSearchParams(newParams);
    } else {
      if (query) {
        navigate(`/search?query=${encodeURIComponent(query)}`);
      } else {
        navigate("/search");
      }
    }
  };

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-300 mx-auto px-6 h-18 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-[#4E6A4E]">
            <h1 className="text-2xl font-bold text-[#4E6A4E]">OReMA.vn</h1>
          </Link>
          <button className="text-[#4E6A4E] font-medium ">Nữ</button>
        </div>

        {/* SEARCH */}
        <form onSubmit={handleSearchSubmit} className="flex-1 px-10">
          <div className="flex items-center bg-[#F4F4F4] rounded-full px-4 h-11">
            <input
              type="text"
              placeholder="Tìm kiếm trên OReMa..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
            />
            <button type="submit" className="text-gray-500 hover:text-black transition-colors focus:outline-none flex items-center justify-center">
              <Search size={18} />
            </button>
          </div>
        </form>

        {/* RIGHT */}
        <div className="flex items-center gap-6">
          {/* USER / LOGIN */}
          {user ? (
            <UserDropdown user={user} />
          ) : (
            <Link to="/login" className="text-sm font-medium text-[#4E6A4E]">
              Đăng nhập
            </Link>
          )}

          {/* CART ICON với badge */}
          <Link
            to="/cart"
            className="relative text-gray-700 hover:text-black transition-colors"
          >
            <ShoppingCart size={20} className="cursor-pointer" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-4.5 h-4.5 bg-[#E74C3C] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-[3px]">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          <Bell size={20} className="cursor-pointer" />

          {/* BUTTON */}
          <Link
            to="/selling-post"
            className="text-gray-700 hover:text-black transition-colors"
          >
            <button className="bg-[#4E6A4E] text-white px-5 h-10 rounded-full font-medium hover:cursor-pointer">
              Đăng bán
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
