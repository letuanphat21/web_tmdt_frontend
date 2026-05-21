import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "@/redux/store";
import { resetCart } from "@/redux/cartSlice/cartSlice";
import { taoDonHang } from "@/services/orderService";
import ShippingInfo from "./sections/ShippingInfo";
import PaymentMethod from "./sections/PaymentMethod";
import OrderSummary from "./sections/OrderSummary";

/* ================= TYPES ================= */
export type ShippingData = {
  hoTen: string;
  soDienThoai: string;
  diaChiChiTiet: string;
  thanhPho: string;
};

export type CartItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
  image: string;
};

export type PaymentType = "cod";

const SHIPPING_FEE = 30000;

/* ================= COMPONENT ================= */
const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);
  const cart = useSelector((state: RootState) => state.cart.cart);

  const [shipping, setShipping] = useState<ShippingData>({
    hoTen: user ? `${user.name ?? ""}`.trim() : "",
    soDienThoai: user?.phone ?? "",
    diaChiChiTiet: user?.address ?? "",
    thanhPho: "",
  });

  const [payment, setPayment] = useState<PaymentType>("cod");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect nếu chưa đăng nhập hoặc giỏ trống
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-600">Vui lòng đăng nhập để thanh toán.</p>
        <button
          onClick={() => navigate("/login")}
          className="bg-[#49613E] text-white px-6 py-2 rounded-full font-medium"
        >
          Đăng nhập
        </button>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-600">Giỏ hàng trống, không thể thanh toán.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-[#49613E] text-white px-6 py-2 rounded-full font-medium"
        >
          Tiếp tục mua sắm
        </button>
      </div>
    );
  }

  // Map cart items sang CartItem type cho OrderSummary
  const cartItems: CartItem[] = cart.items.map((item) => ({
    id: item.maItem,
    name: item.tenSanPham,
    price: item.giaSanPham,
    qty: item.soLuong,
    image: item.hinhAnh ?? "",
  }));

  const subtotal = cart.tongTien;
  const total = subtotal + SHIPPING_FEE;

  const handleCheckout = async () => {
    const diaChi = [shipping.diaChiChiTiet, shipping.thanhPho]
      .filter(Boolean)
      .join(", ");

    if (!diaChi.trim()) {
      setError("Vui lòng nhập địa chỉ nhận hàng.");
      return;
    }
    if (!shipping.hoTen.trim()) {
      setError("Vui lòng nhập họ tên người nhận.");
      return;
    }
    if (!shipping.soDienThoai.trim()) {
      setError("Vui lòng nhập số điện thoại.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await taoDonHang({
        diaChiNhanHang: `${shipping.hoTen} | ${shipping.soDienThoai} | ${diaChi}`,
        chiPhiGiaoHang: SHIPPING_FEE,
      });

      // Xóa cart trong Redux sau khi đặt hàng thành công
      dispatch(resetCart());

      // Chuyển sang trang đơn mua với thông báo thành công
      navigate("/profile/buy-orders", {
        state: { successOrderId: res.data.maDonHang },
      });
    } catch {
      setError("Đặt hàng thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* LEFT */}
      <div className="lg:col-span-2 space-y-6">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}
        <ShippingInfo data={shipping} setData={setShipping} />
        <PaymentMethod method={payment} setMethod={setPayment} />
      </div>

      {/* RIGHT */}
      <OrderSummary
        cart={cartItems}
        subtotal={subtotal}
        shippingFee={SHIPPING_FEE}
        total={total}
        loading={loading}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Checkout;
