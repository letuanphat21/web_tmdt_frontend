import ProductCard from "@/components/common/ProductCard";

const mockData = [
    {
        title: "Áo Khoác Wool Minimalist",
        price: "1.250.000đ",
        seller: "@thanh_nha",
        image: "/images/p1.jpg",
        tag: "Like New",
    },
    {
        title: "Jeans Vintage Levi's 501",
        price: "850.000đ",
        seller: "@kyle_store",
        image: "/images/p2.jpg",
        tag: "99% New",
    },
    {
        title: "Giày Cao Gót Leather Blue",
        price: "2.100.000đ",
        seller: "@luxury_resale",
        image: "/images/p3.jpg",
        tag: "Like New",
    },
    {
        title: "Túi Xách Da Thủ Công",
        price: "3.400.000đ",
        seller: "@handcrafted_vn",
        image: "/images/p4.jpg",
        tag: "95% New",
    },
];

const ProductSection = ({title}: { title: string }) => {
    return (
        <section className="w-full px-6 lg:px-10">

            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-[#4E6A4E]">
                    {title}
                </h2>

                <button className="text-sm text-gray-600">
                    Xem tất cả →
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                {mockData.map((item, i) => (
                    <ProductCard key={i} {...item} />
                ))}
            </div>

        </section>
    );
};

export default ProductSection;