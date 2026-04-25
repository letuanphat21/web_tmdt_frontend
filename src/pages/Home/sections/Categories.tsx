const categories = [
    "Áo Sơ Mi",
    "Quần Jeans",
    "Phụ kiện",
    "Túi Xách",
    "Giày Dép",
    "Trang Sức",
];

const Categories = () => {
    return (
        <section className="bg-[#F5F5F3] py-16">
            <div className="w-full px-6 lg:px-10">

                <h2 className="text-2xl font-semibold text-[#4E6A4E]">
                    Danh mục nổi bật
                </h2>

                <p className="mt-2 text-sm text-gray-600">
                    Khám phá thế giới thời trang qua lăng kính bền vững.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-8">
                    {categories.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-4 flex flex-col items-center gap-3 shadow-sm"
                        >
                            <div className="w-10 h-10 bg-[#E4E8E1] rounded-full flex items-center justify-center">
                                <i className="fa-solid fa-shirt"></i>
                            </div>
                            <span className="text-sm">{item}</span>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Categories;