const sellers = [
    {
        name: "Thanh Nhã",
        reviews: "48 đánh giá",
        desc: "Yêu thích phong cách Minimalism...",
    },
    {
        name: "Minh Quân",
        reviews: "32 đánh giá",
        desc: "Chuyên đồ Vintage Jeans...",
    },
    {
        name: "Hà Linh",
        reviews: "115 đánh giá",
        desc: "Luxury Second-hand...",
    },
];

const SellerSection = () => {
    return (
        <section className="bg-[#F5F5F3] py-16">

            <div className="max-w-[1200px] mx-auto px-6 text-center">

                <h2 className="text-2xl font-semibold">
                    Cộng đồng người bán
                </h2>

                <p className="text-sm text-gray-600 mt-2">
                    Những thành viên tích cực nhất...
                </p>

                <div className="grid md:grid-cols-3 gap-6 mt-10">

                    {sellers.map((s, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl shadow-sm">

                            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto" />

                            <h3 className="mt-4 font-medium">{s.name}</h3>

                            <p className="text-xs text-gray-500">
                                ({s.reviews})
                            </p>

                            <p className="text-sm mt-3 text-gray-600">
                                {s.desc}
                            </p>

                            <button className="mt-4 border px-4 py-2 rounded-full text-sm">
                                Ghé thăm Store
                            </button>

                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default SellerSection;