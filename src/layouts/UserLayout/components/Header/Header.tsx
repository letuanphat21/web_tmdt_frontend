import {useState} from "react";
import {Link} from "react-router-dom";
import {Bell, Search, ShoppingCart} from "lucide-react";

type User = {
    name: string;
};

const Header = () => {
    const [user] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    return (
        <header className="w-full bg-white shadow-sm">
            <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">

                {/* LEFT */}
                <div className="flex items-center gap-8">
                    <Link
                        to="/"
                        className="text-sm font-medium text-[#4E6A4E]"
                    >
                        <h1 className="text-2xl font-bold text-[#4E6A4E]">
                            OReMA.vn
                        </h1>
                    </Link>
                    <button className="text-[#4E6A4E] font-medium underline">
                        Nữ
                    </button>
                </div>

                {/* SEARCH */}
                <div className="flex-1 px-10">
                    <div className="flex items-center bg-[#F4F4F4] rounded-full px-4 h-[44px]">
                        <input
                            type="text"
                            placeholder="Tìm kiếm trên OReMa..."
                            className="flex-1 bg-transparent outline-none text-sm"
                        />
                        <Search size={18}/>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-6">

                    {/* 🔥 USER / LOGIN */}
                    {user ? (
                        <div className="flex items-center gap-2">
                            <div
                                className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                                {user.name.charAt(0)}
                            </div>
                            <span className="text-sm font-medium">
                {user.name}
              </span>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="text-sm font-medium text-[#4E6A4E]"
                        >
                            Đăng nhập
                        </Link>
                    )}

                    {/* ICONS */}
                    <Link to="/cart" className="text-gray-700 hover:text-black transition-colors">
                        <ShoppingCart size={20} className="cursor-pointer" />
                    </Link>
                    <Bell size={20} className="cursor-pointer"/>

                    {/* BUTTON */}
                    <Link to="/selling-post" className="text-gray-700 hover:text-black transition-colors">
                        <button className="bg-[#4E6A4E] text-white px-5 h-[40px] rounded-full font-medium">
                            Đăng bán
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;