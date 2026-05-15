import { Link } from "react-router-dom";
import { Bell, Search, ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import UserDropdown from "./UserDropdown/UserDropdown";

const Header = () => {
  const user = useSelector((state: any) => state.auth.user);

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
        <div className="flex-1 px-10">
          <div className="flex items-center bg-[#F4F4F4] rounded-full px-4 h-11">
            <input
              type="text"
              placeholder="Tìm kiếm trên OReMa..."
              className="flex-1 bg-transparent outline-none text-sm"
            />
            <Search size={18} />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6">
          {/* 🔥 USER / LOGIN */}
          {user ? (
            <UserDropdown user={user} />
          ) : (
            <Link to="/login" className="text-sm font-medium text-[#4E6A4E]">
              Đăng nhập
            </Link>
          )}

          {/* ICONS */}
          <Link
            to="/cart"
            className="text-gray-700 hover:text-black transition-colors"
          >
            <ShoppingCart size={20} className="cursor-pointer" />
          </Link>
          <Bell size={20} className="cursor-pointer" />

          {/* BUTTON */}
          <Link
            to="/selling-post"
            className="text-gray-700 hover:text-black transition-colors"
          >
            <button className="bg-[#4E6A4E] text-white px-5 h-10 rounded-full font-medium">
              Đăng bán
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
