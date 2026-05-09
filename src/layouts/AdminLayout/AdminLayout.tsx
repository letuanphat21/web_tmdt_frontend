import { NavLink, Outlet } from "react-router-dom";

// Danh sách các menu theo đúng Figma
const adminMenus = [
    { path: "/admin/users", label: "Quản lý người dùng" },
    { path: "/admin/reports", label: "Thống kê báo cáo" },
    { path: "/admin/orders", label: "Quản lý đơn hàng" },
    { path: "/admin/products", label: "Quản lý sản phẩm" },
    { path: "/admin/content", label: "Duyệt nội dung" },
    { path: "/admin/complaints", label: "Quản lý khiếu nại" },
    { path: "/admin/promotions", label: "Quản lý khuyến mãi" },
    { path: "/admin/shipping", label: "Quản lý vận chuyển" },
    { path: "/admin/messages", label: "Tin nhắn khách hàng" },
    { path: "/admin/reviews", label: "Quản lý đánh giá" },
];

const AdminLayout = () => {
    return (
        <div className="flex h-screen bg-[#F9FAF4]">
            {/* Sidebar Trái */}
            <div className="w-[280px] bg-[#F9FAF4] border-r border-gray-200 flex flex-col">
                {/* Logo */}
                <div className="h-20 flex items-center px-8">
                    <h1 className="text-2xl font-bold text-[#49613E]">OReMA.vn</h1>
                </div>

                {/* Tiêu đề mục */}
                <div className="px-8 py-4">
                    <p className="text-xs font-bold text-gray-400 tracking-wider">KÊNH ADMIN</p>
                </div>

                {/* Danh sách Menu */}
                <nav className="flex-1 overflow-y-auto px-4 space-y-1 pb-6">
                    {adminMenus.map((menu) => (
                        <NavLink
                            key={menu.path}
                            to={menu.path}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 rounded-2xl transition-all ${
                                    isActive
                                        ? "bg-white text-[#1A1C19] shadow-sm font-bold" // Active giống Figma (trắng, có bóng mờ)
                                        : "text-gray-500 hover:bg-gray-100 font-medium"
                                }`
                            }
                        >
                            <span className="truncate">{menu.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Khu vực nội dung Phải */}
            <div className="flex-1 flex flex-col overflow-hidden bg-[#F9FAF4]">
                {/* Header Phải */}
                <header className="h-20 flex items-center justify-end px-10">
                    <span className="font-bold text-[#1A1C19] text-lg">Xin chào admin</span>
                </header>

                {/* Vùng chứa nội dung các trang */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto px-10 pb-10">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;