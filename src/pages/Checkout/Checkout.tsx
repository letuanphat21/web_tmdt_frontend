import { useState } from "react";
import ShippingInfo from "./sections/ShippingInfo";
import PaymentMethod from "./sections/PaymentMethod";
import OrderSummary from "./sections/OrderSummary";
import order1 from "@/assets/order1.png";
import order2 from "@/assets/order2.png";
/* ================= TYPES ================= */

export type ShippingData = {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
};

export type CartItem = {
    id: number;
    name: string;
    price: number;
    qty: number;
    image: string;
};

export type PaymentType = "card" | "paypal" | "cod";

/* ================= COMPONENT ================= */

const Checkout = () => {
    const [shipping, setShipping] = useState<ShippingData>({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
    });

    const [payment, setPayment] = useState<PaymentType>("card");

    // 👉 mock data giống ảnh
    const cart: CartItem[] = [
        { id: 1, name: "Vintage Alpaca Knit", price: 145, qty: 1 , image: order1},
        { id: 2, name: "Artisan Sculptural Vase", price: 85, qty: 1 , image: order2},
    ];

    const subtotal = cart.reduce((acc, i) => acc + i.price * i.qty, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    const handleCheckout = () => {
        alert("Thanh toán thành công (mock)");
    };

    return (
        <div className="max-w-[1100px] mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">
                <ShippingInfo data={shipping} setData={setShipping} />
                <PaymentMethod method={payment} setMethod={setPayment} />
            </div>

            {/* RIGHT */}
            <OrderSummary
                cart={cart}
                subtotal={subtotal}
                tax={tax}
                total={total}
                onCheckout={handleCheckout}
            />
        </div>
    );
};

export default Checkout;