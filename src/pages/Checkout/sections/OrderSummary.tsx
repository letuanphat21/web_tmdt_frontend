import type { CartItem } from "../Checkout";

type Props = {
    cart: CartItem[];
    subtotal: number;
    tax: number;
    total: number;
    onCheckout: () => void;
};

const OrderSummary = ({
                          cart,
                          subtotal,
                          tax,
                          total,
                          onCheckout,
                      }: Props) => {
    return (
        <div className="bg-[#F7F7F3] p-6 rounded-[20px] border border-[#E5E7E1]">

            {/* TITLE */}
            <h2 className="text-[22px] font-semibold text-[#1F3D2B] mb-6">
                Order Summary
            </h2>

            {/* PRODUCT LIST */}
            <div className="space-y-5">
                {cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                        {/* IMAGE */}
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-[64px] h-[64px] rounded-[10px] object-cover"
                        />

                        {/* INFO */}
                        <div className="flex-1">
                            <p className="text-[14px] font-medium text-[#1A1C19]">
                                {item.name}
                            </p>

                            <p className="text-[11px] tracking-[1px] text-[#7C8273] uppercase">
                                Size: Medium • Gently Used
                            </p>

                            <p className="text-[14px] text-[#1F3D2B] mt-1">
                                £{item.price.toFixed(2)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* DISCOUNT */}
            <div className="mt-6">
                <p className="text-[11px] tracking-[1px] text-[#6B705C] mb-2">
                    DISCOUNT CODE
                </p>

                <div className="flex gap-2">
                    <input
                        placeholder="CURATED20"
                        className="
              flex-1
              h-[42px]
              px-4
              rounded-[10px]
              bg-white
              border border-[#E5E7E1]
              text-[13px]
              placeholder:text-[#B8BCB2]
              focus:outline-none focus:ring-1 focus:ring-[#2F4F2F]
            "
                    />

                    <button
                        className="
              px-5
              rounded-[10px]
              bg-[#1F3D2B]
              text-white
              text-[13px]
              font-semibold
              hover:bg-[#183022]
              transition
            "
                    >
                        Apply
                    </button>
                </div>
            </div>

            {/* DIVIDER */}
            <div className="border-t border-[#E5E7E1] my-6" />

            {/* PRICE */}
            <div className="space-y-3 text-[14px] text-[#444840]">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>£{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>£0.00 (Complimentary)</span>
                </div>

                <div className="flex justify-between">
                    <span>Tax</span>
                    <span>£{tax.toFixed(2)}</span>
                </div>
            </div>

            {/* TOTAL */}
            <div className="flex justify-between items-center mt-6">
        <span className="text-[18px] font-semibold text-[#1F3D2B]">
          Total
        </span>
                <span className="text-[22px] font-bold text-[#1F3D2B]">
          £{total.toFixed(2)}
        </span>
            </div>

            {/* BUTTON */}
            <button
                onClick={onCheckout}
                className="
          w-full
          mt-6
          bg-[#1F3D2B]
          hover:bg-[#183022]
          text-white
          py-3.5
          rounded-full
          text-[14px]
          font-semibold
          transition
        "
            >
                Complete Purchase →
            </button>

            {/* NOTE */}
            <p className="text-[10px] text-center text-[#7C8273] mt-4 leading-[16px]">
                By clicking complete purchase, you agree to our terms of service
                and sustainability policy.
            </p>

            {/* ICONS */}
            <div className="flex justify-center gap-6 mt-5 text-[#B8BCB2] text-[20px]">
                <span>🛡️</span>
                <span>📦</span>
                <span>🌿</span>
            </div>
        </div>
    );
};

export default OrderSummary;