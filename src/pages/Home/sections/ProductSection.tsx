import { useEffect, useState } from 'react';
import ProductCard from "@/components/common/ProductCard";
import { getNewestProducts, getBestSellingProducts } from '@/services/homeService';
import type { Product } from '@/services/homeService';

interface ProductSectionProps {
    title: string;
}

const ProductSection = ({ title }: ProductSectionProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const isNewest = title.toLowerCase().includes('mới');

    useEffect(() => {
        setLoading(true);
        
        if (isNewest) {
            getNewestProducts(10)
                .then((res) => {
                    setProducts(res.data.data);
                    setTotalPages(1);
                })
                .catch((err) => console.error('Error fetching newest products:', err))
                .finally(() => setLoading(false));
        } else {
            getBestSellingProducts(page, 10)
                .then((res) => {
                    setProducts(res.data.data.content);
                    setTotalPages(res.data.data.totalPages);
                })
                .catch((err) => console.error('Error fetching best-selling products:', err))
                .finally(() => setLoading(false));
        }
    }, [page, isNewest]);

    if (loading) {
        return (
            <section className="w-full px-6 lg:px-10">
                <h2 className="text-xl font-semibold text-[#4E6A4E] mb-6">{title}</h2>
                <div className="text-center py-12 text-gray-500">Đang tải sản phẩm...</div>
            </section>
        );
    }

    if (products.length === 0) {
        return (
            <section className="w-full px-6 lg:px-10">
                <h2 className="text-xl font-semibold text-[#4E6A4E] mb-6">{title}</h2>
                <div className="text-center py-12 text-gray-500">Không có sản phẩm nào</div>
            </section>
        );
    }

    const mockProducts = products.map(p => ({
        title: p.tenSanPham,
        price: `${p.giaSanPham.toLocaleString('vi-VN')}đ`,
        seller: `@${p.tenNguoiBan}`,
        image: p.hinhAnhDaiDien || '/images/placeholder.jpg',
        tag: `${p.danhGia.toFixed(1)}⭐`,
    }));

    return (
        <section className="w-full px-6 lg:px-10">

            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-[#4E6A4E]">
                    {title}
                </h2>

                <button className="text-sm text-gray-600 hover:text-gray-900">
                    Xem tất cả →
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                {mockProducts.map((item, i) => (
                    <ProductCard key={i} {...item} />
                ))}
            </div>

            {/* Pagination */}
            {!isNewest && totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                        onClick={() => setPage(Math.max(0, page - 1))}
                        disabled={page === 0}
                        className="px-4 py-2 bg-[#49613E] text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-[#3a4830] transition"
                    >
                        ← Trước
                    </button>
                    <span className="px-4 py-2 text-gray-700 font-medium">
                        Trang {page + 1} / {totalPages}
                    </span>
                    <button
                        onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                        disabled={page >= totalPages - 1}
                        className="px-4 py-2 bg-[#49613E] text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-[#3a4830] transition"
                    >
                        Tiếp →
                    </button>
                </div>
            )}

        </section>
    );
};

export default ProductSection;