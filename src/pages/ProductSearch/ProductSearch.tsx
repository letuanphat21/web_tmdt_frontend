import { useState } from 'react';

// Dữ liệu mẫu
const sampleProducts = [
    { id: 1, name: "Áo Blazer Zara kẻ sọc", price: "250.000đ", condition: "90%", size: "M", image: "https://via.placeholder.com/300x400?text=Blazer" },
    { id: 2, name: "Quần Jean ống rộng Levis", price: "350.000đ", condition: "95%", size: "L", image: "https://via.placeholder.com/300x400?text=Jean" },
    { id: 3, name: "Áo thun Graphic Local Brand", price: "100.000đ", condition: "80%", size: "S", image: "https://via.placeholder.com/300x400?text=T-Shirt" },
    { id: 4, name: "Chân váy chữ A Ulzzang", price: "120.000đ", condition: "Mới nguyên tag", size: "M", image: "https://via.placeholder.com/300x400?text=Skirt" },
];

const ProductSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="bg-[#F9FAF4] min-h-screen py-8">
            <div className="max-w-[1200px] mx-auto px-6">

                {/* Thanh tìm kiếm tổng */}
                <div className="mb-8 flex gap-4">
                    <input
                        type="text"
                        placeholder="Tìm kiếm áo khoác, quần jean, phụ kiện..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:border-[#49613E] shadow-sm"
                    />
                    <button className="px-8 py-4 bg-[#49613E] text-white rounded-full font-bold cursor-pointer hover:bg-[#3a4d31] transition-all">
                        Tìm kiếm
                    </button>
                </div>

                <div className="flex gap-8">
                    {/* Cột trái: Bộ lọc (Sidebar Filters) */}
                    <div className="w-[280px] flex-shrink-0 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-[18px] font-bold text-[#1A1C19]">Bộ Lọc</h2>
                            <button className="text-sm text-gray-500 hover:text-[#49613E] cursor-pointer">Xóa bộ lọc</button>
                        </div>

                        {/* Lọc Danh mục */}
                        <div className="mb-6 border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-[#1A1C19] mb-4">Danh mục</h3>
                            <div className="space-y-3">
                                {['Áo nam', 'Áo nữ', 'Quần nam', 'Quần nữ', 'Phụ kiện'].map((item) => (
                                    <label key={item} className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 accent-[#49613E] cursor-pointer" />
                                        <span className="text-gray-700">{item}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Lọc Tình trạng */}
                        <div className="mb-6 border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-[#1A1C19] mb-4">Tình trạng</h3>
                            <div className="space-y-3">
                                {['Mới nguyên tag', 'Như mới (95-99%)', 'Tốt (85-90%)', 'Khá (<85%)'].map((item) => (
                                    <label key={item} className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 accent-[#49613E] cursor-pointer" />
                                        <span className="text-gray-700">{item}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Lọc Khoảng giá */}
                        <div>
                            <h3 className="font-semibold text-[#1A1C19] mb-4">Khoảng giá</h3>
                            <div className="flex items-center gap-2">
                                <input type="text" placeholder="TỪ" className="w-full text-center border border-gray-300 rounded-lg py-2 focus:outline-none focus:border-[#49613E]" />
                                <span>-</span>
                                <input type="text" placeholder="ĐẾN" className="w-full text-center border border-gray-300 rounded-lg py-2 focus:outline-none focus:border-[#49613E]" />
                            </div>
                            <button className="w-full mt-4 bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-all cursor-pointer">
                                Áp dụng giá
                            </button>
                        </div>
                    </div>

                    {/* Cột phải: Kết quả & Sắp xếp */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-[20px] font-bold text-[#1A1C19]">
                                Kết quả tìm kiếm (124 sản phẩm)
                            </h2>
                            <div className="flex items-center gap-3">
                                <span className="text-gray-600">Sắp xếp theo:</span>
                                <select className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-[#49613E] cursor-pointer">
                                    <option>Mới nhất</option>
                                    <option>Giá: Thấp đến cao</option>
                                    <option>Giá: Cao đến thấp</option>
                                </select>
                            </div>
                        </div>

                        {/* Lưới sản phẩm */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {sampleProducts.map((item) => (
                                <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                                    <div className="h-[250px] overflow-hidden relative">
                                        <div className="absolute top-2 left-2 bg-[#49613E] text-white text-xs font-bold px-2 py-1 rounded">
                                            {item.condition}
                                        </div>
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-gray-800 font-semibold truncate mb-2">{item.name}</h3>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#49613E] font-bold text-lg">{item.price}</span>
                                            <span className="text-xs text-gray-500 border border-gray-200 px-2 py-1 rounded">Size: {item.size}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductSearch;