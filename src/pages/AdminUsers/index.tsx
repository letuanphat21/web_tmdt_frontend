import { useState } from "react";

// Dữ liệu giả lập (Mock data) giống hệt thiết kế
const mockUsers = Array(5).fill({
    product: "Jeans Vintage Levi's 501",
    shopName: "Jeans Vintage Levi's 501",
    id: "121232323",
    owner: "Phạm Xuân Hải",
    date: "12/3/2026",
    status: "Đã duyệt"
});

const AdminUsers = () => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto pt-4">

            {/* 1. Breadcrumb (Điều hướng) */}
            <div className="flex items-center gap-3 text-sm">
                <span className="text-gray-500">Kênh ADMIN</span>
                <span className="text-gray-400 font-bold">›</span>
                <span className="font-bold text-[#1A1C19]">Quản lý người dùng</span>
            </div>

            {/* 2. Tiêu đề */}
            <h2 className="text-2xl font-bold text-center text-[#1A1C19]">
                Thông tin seller
            </h2>

            {/* 3. Thanh Tìm kiếm & Sắp xếp */}
            <div className="flex justify-between items-center px-4">
                {/* Search Input */}
                <div className="relative w-[400px]">
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-6 pr-12 py-3 bg-[#F3F4F1] border border-gray-200 rounded-lg focus:outline-none focus:border-[#49613E] transition-colors"
                    />
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sắp xếp:</span>
                    <select className="px-4 py-2 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:border-[#49613E] cursor-pointer text-sm font-medium text-gray-700">
                        <option>MỚI NHẤT</option>
                        <option>CŨ NHẤT</option>
                    </select>
                </div>
            </div>

            {/* 4. Bảng dữ liệu (Table) */}
            <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="border-b border-gray-100">
                        <th className="py-5 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">Sản Phẩm shop bán</th>
                        <th className="py-5 px-6 text-sm font-medium text-gray-500 whitespace-nowrap text-center">Tên shop</th>
                        <th className="py-5 px-6 text-sm font-medium text-gray-500 whitespace-nowrap text-center">ID</th>
                        <th className="py-5 px-6 text-sm font-medium text-gray-500 whitespace-nowrap text-center">Chủ shop</th>
                        <th className="py-5 px-6 text-sm font-medium text-gray-500 whitespace-nowrap text-center">Ngày Đăng</th>
                        <th className="py-5 px-6 text-sm font-medium text-gray-500 whitespace-nowrap text-center">Trạng thái</th>
                        <th className="py-5 px-6 text-sm font-medium text-gray-500 whitespace-nowrap text-center">Điều chỉnh</th>
                    </tr>
                    </thead>
                    <tbody>
                    {mockUsers.map((user, index) => (
                        <tr key={index} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <td className="py-6 px-6 text-sm font-bold text-[#1A1C19]">{user.product}</td>
                            <td className="py-6 px-6 text-sm font-bold text-[#1A1C19] text-center">{user.shopName}</td>
                            <td className="py-6 px-6 text-sm text-gray-500 text-center">{user.id}</td>
                            <td className="py-6 px-6 text-sm text-gray-500 text-center">{user.owner}</td>
                            <td className="py-6 px-6 text-sm text-gray-500 text-center">{user.date}</td>
                            <td className="py-6 px-6 text-sm text-gray-500 text-center">{user.status}</td>
                            <td className="py-6 px-6 text-sm text-center">
                                {/* Chỗ này trong thiết kế trống, nhưng sau này có thể để nút Edit/Delete */}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* 5. Phân trang (Pagination) */}
            <div className="flex justify-center items-center gap-4 mt-4 pb-8">
                <button className="px-6 py-2 bg-[#51604B] text-white font-medium rounded-full hover:bg-[#3d4938] transition-colors shadow-sm">
                    First Page
                </button>

                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((page) => (
                        <button
                            key={page}
                            className={`w-10 h-10 flex items-center justify-center rounded-full border text-sm font-medium transition-colors
                                ${page === 1
                                ? "border-[#49613E] text-[#49613E] font-bold" // Trang hiện tại
                                : "border-[#1A1C19] text-[#1A1C19] hover:bg-gray-100" // Các trang khác
                            }
                            `}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <button className="px-6 py-2 bg-[#51604B] text-white font-medium rounded-full hover:bg-[#3d4938] transition-colors shadow-sm">
                    Last Page
                </button>
            </div>

        </div>
    );
};

export default AdminUsers;