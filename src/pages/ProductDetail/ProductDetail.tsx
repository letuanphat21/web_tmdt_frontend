import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { addItemToCart } from "@/redux/cartSlice/cartSlice";
import { getProductDetail } from "@/services/productService";
import type { ProductDetailDTO } from "@/services/productService";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const [product, setProduct] = useState<ProductDetailDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartMsg, setCartMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getProductDetail(id)
      .then((res) => {
        // axiosClient.get trả về response.data, vì interceptor đã xử lý
        // Kiểm tra xem res có phải là { data: ProductDetailDTO } hay chỉ ProductDetailDTO
        const productData = res.data || res;
        setProduct(productData);
        setSelectedImage(0);
      })
      .catch(() => setError("Không thể tải thông tin sản phẩm."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleQuantityChange = (value: number) => {
    if (!product) return;
    if (value >= 1 && value <= product.soLuong) setQuantity(value);
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (!product) return;
    setAddingToCart(true);
    try {
      await dispatch(
        addItemToCart({ maSanPham: product.maSanPham, soLuong: quantity }),
      ).unwrap();
      setCartMsg("Đã thêm vào giỏ hàng!");
      setTimeout(() => setCartMsg(null), 2500);
    } catch {
      setCartMsg("Thêm vào giỏ thất bại. Vui lòng thử lại.");
      setTimeout(() => setCartMsg(null), 2500);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (!product) return;
    setAddingToCart(true);
    try {
      await dispatch(
        addItemToCart({ maSanPham: product.maSanPham, soLuong: quantity }),
      ).unwrap();
      navigate("/cart");
    } catch {
      setCartMsg("Có lỗi xảy ra. Vui lòng thử lại.");
      setTimeout(() => setCartMsg(null), 2500);
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Đang tải sản phẩm...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">{error ?? "Sản phẩm không tồn tại."}</p>
      </div>
    );
  }

  const images =
    product.hinhAnhs && product.hinhAnhs.length > 0
      ? product.hinhAnhs
      : ["https://via.placeholder.com/500x500?text=No+Image"];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.round(rating) ? "text-[#FFA500]" : "text-gray-300"}>
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4">

        {/* Toast thông báo */}
        {cartMsg && (
          <div className="fixed top-6 right-6 z-50 bg-[#49613E] text-white px-5 py-3 rounded-lg shadow-lg text-sm">
            {cartMsg}
          </div>
        )}

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden bg-[#F9FAF4]">
              <div className="absolute top-3 left-3 bg-[#49613E] text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                {product.tenTheLoai}
              </div>
              <img
                src={images[selectedImage]}
                alt={product.tenSanPham}
                className="w-full h-[450px] object-cover"
              />
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-[#49613E]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Ảnh ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">

            {/* Title & Rating */}
            <div className="space-y-3">
              <h1 className="text-[32px] font-bold text-[#1A1C19] leading-tight">
                {product.tenSanPham}
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex">{renderStars(product.danhGia || 0)}</div>
                <span className="text-[14px] text-[#666]">
                  {(product.danhGia || 0).toFixed(1)} ({product.soLuongDanhGia || 0} đánh giá)
                </span>
              </div>
            </div>

            {/* Price */}
            <div>
              <span className="text-[32px] font-bold text-[#49613E]">
                {(product.giaSanPham || 0).toLocaleString("vi-VN")}đ
              </span>
            </div>

            {/* Seller & Stock */}
            <div className="border-t border-b border-[#E5E5E5] py-4 space-y-2">
              <p className="text-[14px] text-[#666]">
                <span className="font-semibold text-[#1A1C19]">Người bán: </span>
                {product.tenNguoiBan || product.email}
              </p>
              <p className="text-[14px] text-[#666]">
                <span className="font-semibold text-[#1A1C19]">Danh mục: </span>
                {product.tenTheLoai}
              </p>
              <p className="text-[14px]">
                <span className="font-semibold text-[#1A1C19]">Kho hàng: </span>
                {product.soLuong > 0 ? (
                  <span className="text-[#49613E]">Còn {product.soLuong} sản phẩm</span>
                ) : (
                  <span className="text-[#E74C3C]">Đã hết hàng</span>
                )}
              </p>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <label className="text-[14px] font-semibold text-[#1A1C19]">Số lượng</label>
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
                    onChange={(e) =>
                      handleQuantityChange(parseInt(e.target.value) || 1)
                    }
                    className="w-16 text-center border-l border-r border-[#E5E5E5] py-2 focus:outline-none"
                    min="1"
                    max={product.soLuong}
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="px-4 py-2 text-[#666] hover:bg-[#F9FAF4]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={product.soLuong === 0 || addingToCart}
                className="flex-1 px-6 py-3 border-2 border-[#49613E] text-[#49613E] font-semibold rounded-lg hover:bg-[#F9FAF4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addingToCart ? "Đang thêm..." : "🛒 Thêm vào giỏ"}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.soLuong === 0 || addingToCart}
                className="flex-1 px-6 py-3 bg-[#49613E] text-white font-semibold rounded-lg hover:bg-[#3A4930] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t border-[#E5E5E5] pt-8">
          <h2 className="text-[24px] font-bold text-[#1A1C19] mb-6">
            Đánh giá từ khách hàng ({product.soLuongDanhGia || 0})
          </h2>

          {product.danhGias && product.danhGias.length > 0 ? (
            <div className="space-y-4">
              {product.danhGias.map((review) => (
                <div
                  key={review.maDanhGia}
                  className="border border-[#E5E5E5] rounded-lg p-4"
                >
                  <div className="flex items-center gap-3 mb-2">
                    {review.avatarNguoiDung ? (
                      <img
                        src={review.avatarNguoiDung}
                        alt={review.tenNguoiDung}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-[#49613E] flex items-center justify-center text-white font-semibold text-sm">
                        {(review.tenNguoiDung || review.emailNguoiDung)
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-sm text-[#1A1C19]">
                        {review.tenNguoiDung || review.emailNguoiDung}
                      </p>
                      <div className="flex">{renderStars(review.diemXepHang)}</div>
                    </div>
                  </div>
                  <p className="text-[14px] text-[#666]">{review.nhanXet}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-[#999]">
              <p>Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá sản phẩm này!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
