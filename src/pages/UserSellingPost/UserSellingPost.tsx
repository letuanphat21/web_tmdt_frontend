import React, { useState } from 'react';
import { Camera, X, ChevronRight } from 'lucide-react';

// --- Types ---
interface ProductFormData {
    // Step 1
    image: string | null;
    category: string;
    name: string;
    condition: string;
    // Step 2
    quantity: number;
    price: string;
    description: string;
    color: string;
    brand: string;
    size: string;
}

const initialFormData: ProductFormData = {
    image: null,
    category: '',
    name: '',
    condition: '',
    quantity: 1,
    price: '',
    description: '',
    color: '',
    brand: '',
    size: '',
};

const conditions = [
    { id: 'moi', title: 'Mới', desc: 'Hàng mới kèm mác, chưa mở hộp/ bao bì, chưa qua sử dụng' },
    { id: 'nhu_moi', title: 'Như mới', desc: 'Hàng mới kèm mác, chưa mở hộp/ bao bì, chưa qua sử dụng' },
    { id: 'tot', title: 'Tốt', desc: 'Hàng mới kèm mác, chưa mở hộp/ bao bì, chưa qua sử dụng' },
    { id: 'trung_binh', title: 'Trung bình', desc: 'Hàng mới kèm mác, chưa mở hộp/ bao bì, chưa qua sử dụng' },
    { id: 'kem', title: 'Kém', desc: 'Hàng mới kèm mác, chưa mở hộp/ bao bì, chưa qua sử dụng' },
];

const UserSellingPost: React.FC = () => {
    const [step, setStep] = useState<1 | 2>(1);
    const [formData, setFormData] = useState<ProductFormData>(initialFormData);

    // Xử lý thay đổi dữ liệu
    const handleChange = <K extends keyof ProductFormData>(field: K, value: ProductFormData[K]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleClearField = (field: keyof ProductFormData) => {
        setFormData((prev) => ({ ...prev, [field]: '' }));
    };

    // Xử lý số lượng
    const handleQuantityChange = (type: 'increase' | 'decrease') => {
        if (type === 'decrease' && formData.quantity > 1) {
            handleChange('quantity', formData.quantity - 1);
        } else if (type === 'increase') {
            handleChange('quantity', formData.quantity + 1);
        }
    };

    const handleSubmit = () => {
        console.log('Dữ liệu đăng bán:', formData);
        alert('Đăng bán thành công!');
        // Thêm logic gọi API ở đây
    };

    return (
        <div className="min-h-screen bg-[#fafafa] py-10 font-sans text-[#1A1C19]">
            <div className="max-w-4xl mx-auto px-6">

                {/* Title & Breadcrumb */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-center text-[#4d5e45] mb-6">
                        Đăng bán
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-gray-600 ml-4 lg:ml-0">
                        <span
                            className={`cursor-pointer ${step === 1 ? 'font-bold text-black' : 'hover:underline'}`}
                            onClick={() => setStep(1)}
                        >
                            Bước 1
                        </span>
                        <ChevronRight className="w-4 h-4" />
                        <span
                            className={`cursor-pointer ${step === 2 ? 'font-bold text-black' : 'hover:underline'}`}
                            onClick={() => {
                                // Tùy chọn: Thêm validate trước khi cho phép bấm sang bước 2
                                setStep(2);
                            }}
                        >
                            Bước 2
                        </span>
                    </div>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 mb-8 border border-[#eaeaea]">

                    {/* BƯỚC 1: Thông tin cơ bản */}
                    {step === 1 && (
                        <div className="space-y-8 max-w-3xl mx-auto">

                            {/* Upload Ảnh */}
                            <div className="space-y-2">
                                <label className="font-semibold text-[15px]">Ảnh</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                                    <Camera className="w-10 h-10 text-gray-600 mb-3" />
                                    <span className="font-semibold text-gray-800">Tải lên hình ảnh</span>
                                </div>
                            </div>

                            {/* Danh mục */}
                            <div className="space-y-2">
                                <label className="font-semibold text-[15px]">Danh mục</label>
                                <select
                                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#4d5e45] bg-white appearance-none"
                                    value={formData.category}
                                    onChange={(e) => handleChange('category', e.target.value)}
                                >
                                    <option value="" disabled>Danh mục</option>
                                    <option value="ao-thun">Áo thun</option>
                                    <option value="ao-khoac">Áo khoác</option>
                                    <option value="quan-jean">Quần Jean</option>
                                </select>
                            </div>

                            {/* Tên sản phẩm */}
                            <div className="space-y-2">
                                <label className="font-semibold text-[15px]">Tên sản phẩm</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="nhập vào"
                                        className="w-full border border-gray-300 rounded-md p-3 pr-10 focus:outline-none focus:border-[#4d5e45]"
                                        value={formData.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                    />
                                    {formData.name && (
                                        <X
                                            className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 cursor-pointer hover:text-black"
                                            onClick={() => handleClearField('name')}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Tình trạng */}
                            <div className="space-y-4">
                                <label className="font-semibold text-[15px]">Tình trạng</label>
                                <div className="flex flex-wrap justify-center gap-4">
                                    {conditions.map((cond) => (
                                        <div
                                            key={cond.id}
                                            onClick={() => handleChange('condition', cond.id)}
                                            className={`w-[30%] min-w-[160px] p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center text-center gap-2
                                                ${formData.condition === cond.id ? 'border-gray-800 bg-gray-50' : 'border-gray-300 hover:border-gray-400'}
                                            `}
                                        >
                                            <span className="font-bold text-[15px]">{cond.title}</span>
                                            <span className="text-[11px] text-gray-400 leading-tight px-2">
                                                {cond.desc}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* BƯỚC 2: Chi tiết sản phẩm */}
                    {step === 2 && (
                        <div className="space-y-6 max-w-2xl mx-auto">

                            {/* Số lượng */}
                            <div className="flex items-center gap-8">
                                <label className="font-semibold text-[15px] min-w-[120px]">Số lượng</label>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleQuantityChange('decrease')}
                                        className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                    >
                                        -
                                    </button>
                                    <div className="w-16 h-8 rounded-md border border-black flex items-center justify-center font-medium">
                                        {formData.quantity}
                                    </div>
                                    <button
                                        onClick={() => handleQuantityChange('increase')}
                                        className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Giá bán */}
                            <div className="space-y-2">
                                <label className="font-semibold text-[15px]">Giá bán</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="nhập vào"
                                        className="w-full border border-black rounded-md p-3 pr-10 focus:outline-none"
                                        value={formData.price}
                                        onChange={(e) => handleChange('price', e.target.value)}
                                    />
                                    {formData.price && (
                                        <X
                                            className="absolute right-3 top-3.5 w-5 h-5 text-gray-600 cursor-pointer hover:text-black"
                                            onClick={() => handleClearField('price')}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Mô tả sản phẩm */}
                            <div className="space-y-2">
                                <label className="font-semibold text-[15px]">Mô tả sản phẩm</label>
                                <div className="relative">
                                    <textarea
                                        placeholder="nhập vào"
                                        rows={4}
                                        className="w-full border border-black rounded-[20px] p-4 pr-10 focus:outline-none resize-none"
                                        value={formData.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                    />
                                    {formData.description && (
                                        <X
                                            className="absolute right-4 top-4 w-5 h-5 text-gray-600 cursor-pointer hover:text-black"
                                            onClick={() => handleClearField('description')}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Màu sắc */}
                            <div className="space-y-2">
                                <label className="font-semibold text-[15px]">Màu sắc</label>
                                <select
                                    className="w-full border border-gray-400 rounded-md p-3 focus:outline-none focus:border-black bg-white appearance-none text-gray-600"
                                    value={formData.color}
                                    onChange={(e) => handleChange('color', e.target.value)}
                                >
                                    <option value="" disabled>Chọn màu sắc</option>
                                    <option value="den">Đen</option>
                                    <option value="trang">Trắng</option>
                                    <option value="xanh">Xanh</option>
                                    <option value="do">Đỏ</option>
                                </select>
                            </div>

                            {/* Thương hiệu */}
                            <div className="space-y-2">
                                <label className="font-semibold text-[15px]">Thương hiệu</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="nhập thương hiệu"
                                        className="w-full border border-black rounded-md p-3 pr-10 focus:outline-none"
                                        value={formData.brand}
                                        onChange={(e) => handleChange('brand', e.target.value)}
                                    />
                                    {formData.brand && (
                                        <X
                                            className="absolute right-3 top-3.5 w-5 h-5 text-gray-600 cursor-pointer hover:text-black"
                                            onClick={() => handleClearField('brand')}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Kích cỡ */}
                            <div className="space-y-2">
                                <label className="font-semibold text-[15px]">Kích cỡ</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Size XL /Size 37"
                                        className="w-full border border-black rounded-md p-3 pr-10 focus:outline-none"
                                        value={formData.size}
                                        onChange={(e) => handleChange('size', e.target.value)}
                                    />
                                    {formData.size && (
                                        <X
                                            className="absolute right-3 top-3.5 w-5 h-5 text-gray-600 cursor-pointer hover:text-black"
                                            onClick={() => handleClearField('size')}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Actions / Buttons */}
                <div className="flex justify-center mt-6 gap-4">
                    {step === 2 && (
                        <button
                            onClick={() => setStep(1)}
                            className="w-40 py-3 rounded-lg font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
                        >
                            Quay lại
                        </button>
                    )}

                    <button
                        onClick={() => step === 1 ? setStep(2) : handleSubmit()}
                        className="w-40 bg-[#4d5e45] text-white py-3 rounded-lg font-medium tracking-wide hover:bg-[#3A4930] transition-colors"
                    >
                        {step === 1 ? 'Tiếp theo' : 'Hoàn tất'}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default UserSellingPost;