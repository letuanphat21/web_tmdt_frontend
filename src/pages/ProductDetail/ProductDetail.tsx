import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// Sample product data - In production, this would come from an API
const sampleProduct = {
    id: '1',
    title: 'Áo Hoodie Uniqlo Xanh Navy - Hàng Cũ Chất Lượng',
    price: '189,000 VNĐ',
    originalPrice: '350,000 VNĐ',
    seller: 'FashionVintage Store',
    rating: 4.5,
    reviews: 87,
    image: 'https://via.placeholder.com/500x500?text=Clothing+Product',
    images: [
        'https://via.placeholder.com/500x500?text=Clothing+1',
        'https://via.placeholder.com/500x500?text=Clothing+2',
        'https://via.placeholder.com/500x500?text=Clothing+3',
        'https://via.placeholder.com/500x500?text=Clothing+4',
    ],
    description: 'Áo Hoodie Uniqlo màu xanh navy, hàng cũ nhập khẩu từ Nhật Bản. Vải cotton mềm mịn, form fit ôm vừa vặn. Tình trạng: Giặt sạch, không mòn, không lỗi. Hoàn hảo cho mùa lạnh và mặc nhà.',
    details: {
        brand: 'Uniqlo',
        size: 'M (Châu Á)',
        color: 'Navy Blue',
        material: 'Cotton 100%',
        condition: 'Như mới - 95%',
        source: 'Nhập khẩu Nhật Bản',
    },
    stock: 1,
    tag: 'Hàng cũ',
};

const ProductDetail: React.FC = () => {
    // In production, the id will be used to fetch product data from API
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _id } = useParams<{ id: string }>();
    const [selectedImage, setSelectedImage] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);

    // In production, fetch product data based on id
    const product = sampleProduct;

    const handleQuantityChange = (value: number) => {
        if (value > 0 && value <= product.stock) {
            setQuantity(value);
        }
    };

    const handleAddToCart = () => {
        // Handle add to cart logic
        console.log(`Added ${quantity} of ${product.title} to cart`);
    };

    const handleBuyNow = () => {
        // Handle buy now logic
        console.log(`Buying ${quantity} of ${product.title}`);
    };

    return (
        <div className="min-h-screen bg-white py-8">
            <div className="max-w-7xl mx-auto px-4">
                
                {/* Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="relative rounded-lg overflow-hidden bg-[#F9FAF4]">
                            {product.tag && (
                                <div className="absolute top-3 left-3 bg-[#49613E] text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                                    {product.tag}
                                </div>
                            )}
                            <img 
                                src={product.images[selectedImage]} 
                                alt={product.title}
                                className="w-full h-[450px] object-cover"
                            />
                        </div>

                        {/* Thumbnail Images */}
                        <div className="flex gap-2">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                        selectedImage === index 
                                            ? 'border-[#49613E]' 
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <img 
                                        src={image} 
                                        alt={`Product ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        
                        {/* Title and Rating */}
                        <div className="space-y-3">
                            <h1 className="text-[32px] font-bold text-[#1A1C19] leading-tight">
                                {product.title}
                            </h1>
                            
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                    <span className="text-[#FFA500]">★★★★☆</span>
                                    <span className="text-[14px] text-[#666]">
                                        {product.rating} ({product.reviews} đánh giá)
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <span className="text-[28px] font-bold text-[#49613E]">
                                    {product.price}
                                </span>
                                <span className="text-[18px] text-[#999] line-through">
                                    {product.originalPrice}
                                </span>
                            </div>
                            <p className="text-[14px] text-[#666]">
                                Tiết kiệm được 161,000 VNĐ so với giá mới
                            </p>
                        </div>

                        {/* Seller Info */}
                        <div className="border-t border-b border-[#E5E5E5] py-4 space-y-3">
                            <p className="text-[14px] text-[#666]">
                                <span className="font-semibold text-[#1A1C19]">Người bán: </span>
                                {product.seller}
                            </p>
                            <p className="text-[14px] text-[#666]">
                                <span className="font-semibold text-[#1A1C19]">Kho hàng: </span>
                                {product.stock > 0 ? (
                                    <span className="text-[#49613E]">Còn {product.stock} chiếc duy nhất</span>
                                ) : (
                                    <span className="text-[#E74C3C]">Đã bán</span>
                                )}
                            </p>
                        </div>

                        {/* Quantity Selector */}
                        <div className="space-y-3">
                            <label className="text-[14px] font-semibold text-[#1A1C19]">
                                Số lượng
                            </label>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-[#E5E5E5] rounded-lg">
                                    <button
                                        onClick={() => handleQuantityChange(quantity - 1)}
                                        className="px-4 py-2 text-[#666] hover:bg-[#F9FAF4]"
                                    >
                                        −
                                    </button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                                        className="w-16 text-center border-l border-r border-[#E5E5E5] py-2 focus:outline-none"
                                        min="1"
                                        max={product.stock}
                                    />
                                    <button
                                        onClick={() => handleQuantityChange(quantity + 1)}
                                        className="px-4 py-2 text-[#666] hover:bg-[#F9FAF4]"
                                    >
                                        +
                                    </button>
                                </div>
                                <span className="text-[14px] text-[#999]">
                                    Hàng cũ - Chỉ có 1 chiếc
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                className="flex-1 px-6 py-3 border-2 border-[#49613E] text-[#49613E] font-semibold rounded-lg hover:bg-[#F9FAF4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                🛒 Thêm vào giỏ
                            </button>
                            <button
                                onClick={handleBuyNow}
                                disabled={product.stock === 0}
                                className="flex-1 px-6 py-3 bg-[#49613E] text-white font-semibold rounded-lg hover:bg-[#3A4930] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Mua ngay
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Details Tabs */}
                <div className="border-t border-[#E5E5E5] pt-8">
                    
                    {/* Description Section */}
                    <section className="mb-12">
                        <h2 className="text-[24px] font-bold text-[#1A1C19] mb-4">
                            Mô tả sản phẩm
                        </h2>
                        <p className="text-[14px] text-[#666] leading-relaxed mb-6">
                            {product.description}
                        </p>

                        {/* Product Specifications */}
                        <div className="space-y-3">
                            <h3 className="text-[16px] font-semibold text-[#1A1C19] mb-3">
                                Thông số kỹ thuật
                            </h3>
                            <div className="space-y-2">
                                {Object.entries(product.details).map(([key, value]) => (
                                    <div 
                                        key={key}
                                        className="flex justify-between py-2 border-b border-[#F0F0F0] text-[14px]"
                                    >
                                        <span className="text-[#666] capitalize">
                                            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                        </span>
                                        <span className="font-semibold text-[#1A1C19]">
                                            {value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Reviews Section */}
                    <section>
                        <h2 className="text-[24px] font-bold text-[#1A1C19] mb-4">
                            Đánh giá từ khách hàng ({product.reviews})
                        </h2>
                        <div className="text-center py-8 text-[#999]">
                            <p>Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá sản phẩm này!</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;

