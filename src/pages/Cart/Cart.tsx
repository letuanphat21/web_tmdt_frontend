import React, {useState} from 'react';
import {Heart, Leaf, Trash2} from 'lucide-react';

// --- Types ---
interface CartItem {
    id: string;
    title: string;
    price: number;
    formattedPrice: string;
    size: string;
    condition: string;
    quantity: number;
    image: string;
}

interface WishlistItem {
    id: string;
    title: string;
    price: string;
    image: string;
}

// --- Sample Data - In production, this would come from an API/Global State ---
const sampleCartItems: CartItem[] = [
    {
        id: '1',
        title: 'Áo Blazer Len Si Tuyển',
        price: 185000,
        formattedPrice: '185.000đ',
        size: 'M',
        condition: '95%',
        quantity: 1,
        image: 'https://via.placeholder.com/150x200?text=Blazer+Brown',
    },
    {
        id: '2',
        title: 'Áo Blazer Len Si Tuyển',
        price: 185000,
        formattedPrice: '185.000đ',
        size: 'M',
        condition: '95%',
        quantity: 1,
        image: 'https://via.placeholder.com/150x200?text=Blazer+Brown',
    },
    {
        id: '3',
        title: 'Áo Blazer Len Si Tuyển',
        price: 185000,
        formattedPrice: '185.000đ',
        size: 'M',
        condition: '95%',
        quantity: 1,
        image: 'https://via.placeholder.com/150x200?text=Blazer+Brown',
    },
];

const sampleWishlistItems: WishlistItem[] = [
    {
        id: 'w1',
        title: 'Blazer Len Dạ',
        price: '1.500.000đ',
        image: 'https://via.placeholder.com/300x400?text=Green+Blazer',
    },
    {
        id: 'w2',
        title: 'Sơ mi Poplin Trắng',
        price: '550.000đ',
        image: 'https://via.placeholder.com/300x400?text=White+Shirt',
    },
];

const Cart: React.FC = () => {
    // In production, fetch cart items from API or Redux/Context
    const [cartItems, setCartItems] = useState<CartItem[]>(sampleCartItems);

    const handleRemoveFromCart = (id: string) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
        console.log(`Removed item ${id} from cart`);
    };

    const handleCheckout = () => {
        console.log('Proceeding to checkout with items:', cartItems);
    };

    const handleContinueShopping = () => {
        console.log('Redirecting to shop...');
    };

    // Calculate totals
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingFee = 30000;
    const discount = 20000;
    const total = subtotal + shippingFee - discount;

    return (
        <div className="min-h-screen bg-[#fafafa] font-sans text-[#1A1C19]">
            {/* Breadcrumb */}
            <div className="px-8 py-4 text-sm text-gray-500">
                <span>Trang chủ</span>
                <span className="mx-2">›</span>
                <span className="font-medium text-[#1A1C19]">Giỏ hàng của tôi</span>
            </div>

            <main className="max-w-7xl mx-auto px-8 pb-20 mt-4">
                <h2 className="text-[28px] font-bold mb-8 uppercase tracking-wide">GIỎ HÀNG CỦA TÔI</h2>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Cart Items */}
                    <div className="flex-1 space-y-6">
                        {cartItems.length === 0 ? (
                            <div className="bg-white p-8 text-center rounded-md border border-[#E5E5E5]">
                                <p className="text-gray-500">Giỏ hàng của bạn đang trống.</p>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.id} className="flex bg-[#f5f5f5] p-6 rounded-md">
                                    <div className="w-32 h-40 bg-white mr-6 flex-shrink-0 rounded overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover mix-blend-multiply"
                                        />
                                    </div>

                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-[18px] font-medium text-[#1A1C19]">
                                                    {item.title}
                                                </h3>
                                                <span className="font-bold text-[18px]">
                                                    {item.formattedPrice}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Size: {item.size} | Độ mới: {item.condition} (Cond tốt)
                                            </p>
                                        </div>

                                        <div className="flex justify-between items-center mt-4">
                                            <div
                                                className="bg-white px-4 py-1.5 border border-gray-200 text-sm font-medium text-gray-600 rounded">
                                                SỐ LƯỢNG: {item.quantity}
                                            </div>
                                            <button
                                                onClick={() => handleRemoveFromCart(item.id)}
                                                className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#E74C3C] transition-colors font-medium"
                                            >
                                                <Trash2 className="w-4 h-4"/>
                                                XÓA KHỎI GIỎ
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="w-full lg:w-[400px]">
                        <div className="bg-[#e8ecea] p-8 rounded-md">
                            <h3 className="text-xl font-semibold mb-6 tracking-wide text-gray-800 uppercase">
                                Tóm tắt đơn hàng
                            </h3>

                            <div className="space-y-4 text-[15px] text-gray-600 mb-6">
                                <div className="flex justify-between">
                                    <span>Tạm tính ({cartItems.length} món)</span>
                                    <span>{subtotal.toLocaleString('vi-VN')} VNĐ</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Phí vận chuyển</span>
                                    <span>{shippingFee.toLocaleString('vi-VN')} VNĐ</span>
                                </div>
                                <div className="flex justify-between text-gray-500">
                                    <span>Giảm giá (Shop si)</span>
                                    <span>-{discount.toLocaleString('vi-VN')} VNĐ</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-end border-t border-gray-300 pt-6 mb-8">
                                <span className="text-sm font-medium text-gray-600 tracking-wider uppercase">
                                    Tổng cộng
                                </span>
                                <span className="text-3xl font-light text-[#1A1C19]">
                                    {total.toLocaleString('vi-VN')}đ
                                </span>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={cartItems.length === 0}
                                className="w-full bg-[#4d5e45] text-white py-4 font-medium tracking-wide rounded hover:bg-[#3A4930] mb-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                TIẾN HÀNH THANH TOÁN
                            </button>

                            <button
                                onClick={handleContinueShopping}
                                className="w-full text-center text-sm font-medium text-gray-600 tracking-wider hover:text-black hover:underline transition-colors"
                            >
                                TIẾP TỤC SĂN ĐỒ SI
                            </button>

                            <div
                                className="mt-6 bg-white/60 p-4 flex gap-3 items-start rounded-md text-[13px] text-gray-600 leading-relaxed font-medium">
                                <Leaf className="w-5 h-5 flex-shrink-0 text-[#4d5e45]"/>
                                <p>CHỌN ĐỒ SI LÀ BẠN ĐANG GÓP PHẦN BẢO VỆ MÔI TRƯỜNG. CẢM ƠN BẠN!</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wishlist Section */}
                <div className="mt-24 border-t border-[#E5E5E5] pt-12">
                    <div className="flex justify-between items-end mb-8">
                        <h2 className="text-[24px] font-bold text-[#1A1C19]">Danh sách mong muốn</h2>
                        <button
                            className="text-sm text-gray-500 font-medium hover:text-black hover:underline transition-colors">
                            Xem tất cả
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {sampleWishlistItems.map((item) => (
                            <div key={item.id} className="group cursor-pointer">
                                <div className="bg-[#f5f5f5] aspect-[4/5] mb-4 relative rounded-md overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <button
                                        className="absolute top-3 right-3 p-2 bg-white rounded-full text-gray-400 hover:text-red-500 shadow-sm transition-colors">
                                        <Heart className="w-4 h-4 fill-current text-[#4d5e45]"/>
                                    </button>
                                </div>
                                <h4 className="font-medium text-[#1A1C19]">{item.title}</h4>
                                <p className="font-bold text-sm mb-4 mt-1">{item.price}</p>
                                <button
                                    className="w-full py-2.5 border border-gray-300 text-sm font-medium rounded text-[#333] hover:bg-gray-50 hover:border-gray-400 transition-colors">
                                    Thêm vào giỏ
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Cart