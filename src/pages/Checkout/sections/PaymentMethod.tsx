import type {PaymentType} from "../Checkout";

/* ================= ITEM COMPONENT ================= */

type ItemProps = {
    id: PaymentType;
    title: string;
    desc: string;
    selected: boolean;
    onSelect: (id: PaymentType) => void;
};

const PaymentItem = ({
                         id,
                         title,
                         desc,
                         selected,
                         onSelect,
                     }: ItemProps) => {
    return (
        <div
            onClick={() => onSelect(id)}
            className={`
        flex justify-between items-center
        px-4 py-3
        rounded-[10px]
        border cursor-pointer
        transition
        ${
                selected
                    ? "bg-[#E6EFE6] border-[#2F4F2F]"
                    : "bg-white border-[#E5E7E1]"
            }
      `}
        >
            <div className="flex items-center gap-3">
                {/* radio */}
                <div
                    className={`
            w-[16px] h-[16px] rounded-full border flex items-center justify-center
            ${selected ? "border-[#2F4F2F]" : "border-[#C8CCBE]"}
          `}
                >
                    {selected && (
                        <div className="w-[6px] h-[6px] bg-[#2F4F2F] rounded-full"/>
                    )}
                </div>

                <div>
                    <p className="text-[13px] font-semibold text-[#1A1C19]">
                        {title}
                    </p>
                    <p className="text-[11px] text-[#7C8273]">{desc}</p>
                </div>
            </div>
        </div>
    );
};

/* ================= MAIN COMPONENT ================= */

type Props = {
    method: PaymentType;
    setMethod: (m: PaymentType) => void;
};

const PaymentMethod = ({method, setMethod}: Props) => {
    const inputClass = `
    w-full h-[42px] px-3
    rounded-[8px]
    bg-white
    border border-[#E5E7E1]
    text-[13px]
    placeholder:text-[#B8BCB2]
    focus:outline-none focus:ring-1 focus:ring-[#2F4F2F]
  `;

    return (
        <div>
            <h2 className="text-[20px] font-semibold mb-4 text-[#1A1C19]">
                Payment Method
            </h2>

            <PaymentItem
                id="card"
                title="Credit or Debit Card"
                desc="Visa, Mastercard, American Express"
                selected={method === "card"}
                onSelect={setMethod}
            />

            {/* CARD FORM */}
            {method === "card" && (
                <div className="bg-[#F6F7F2] p-4 rounded-[12px] mt-3 space-y-3 border border-[#E5E7E1]">
                    <input placeholder="Card Number" className={inputClass}/>

                    <div className="grid grid-cols-2 gap-3">
                        <input placeholder="MM/YY" className={inputClass}/>
                        <input placeholder="CVC" className={inputClass}/>
                    </div>
                </div>
            )}

            <div className="text-center text-[10px] tracking-[1.5px] text-[#9AA091] my-4">
                OR PAY WITH
            </div>

            <div className="space-y-3">
                <PaymentItem
                    id="paypal"
                    title="PayPal"
                    desc="Pay via your PayPal account"
                    selected={method === "paypal"}
                    onSelect={setMethod}
                />

                <PaymentItem
                    id="cod"
                    title="Cash on Delivery (COD)"
                    desc="Pay when delivered"
                    selected={method === "cod"}
                    onSelect={setMethod}
                />
            </div>
        </div>
    );
};

export default PaymentMethod;