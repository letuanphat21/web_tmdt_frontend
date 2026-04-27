import type { ShippingData } from "../Checkout";

type Props = {
    data: ShippingData;
    setData: (d: ShippingData) => void;
};

const ShippingInfo = ({ data, setData }: Props) => {
    function update<K extends keyof ShippingData>(
        key: K,
        value: ShippingData[K]
    ) {
        setData({ ...data, [key]: value });
    }

    const inputClass = `
    w-full h-[42px] px-3
    rounded-[8px]
    bg-[#F6F7F2]
    border border-[#E5E7E1]
    text-[13px]
    text-[#1A1C19]
    placeholder:text-[#B8BCB2]
    focus:outline-none focus:ring-1 focus:ring-[#2F4F2F]
  `;

    const labelClass = `
    text-[11px]
    tracking-[1px]
    font-semibold
    text-[#6B705C]
    mb-1 block
  `;

    return (
        <div>
            <h2 className="text-[22px] font-semibold text-[#1A1C19] mb-6">
                Shipping Information
            </h2>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>FIRST NAME</label>
                    <input
                        value={data.firstName}
                        onChange={(e) => update("firstName", e.target.value)}
                        placeholder="Julian"
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className={labelClass}>LAST NAME</label>
                    <input
                        value={data.lastName}
                        onChange={(e) => update("lastName", e.target.value)}
                        placeholder="Leigh"
                        className={inputClass}
                    />
                </div>
            </div>

            <div className="mt-4">
                <label className={labelClass}>ADDRESS</label>
                <input
                    value={data.address}
                    onChange={(e) => update("address", e.target.value)}
                    placeholder="124 Curated Way"
                    className={inputClass}
                />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                    <label className={labelClass}>CITY</label>
                    <input
                        value={data.city}
                        onChange={(e) => update("city", e.target.value)}
                        placeholder="London"
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className={labelClass}>POSTAL CODE</label>
                    <input
                        value={data.postalCode}
                        onChange={(e) => update("postalCode", e.target.value)}
                        placeholder="E1 6AN"
                        className={inputClass}
                    />
                </div>
            </div>
        </div>
    );
};

export default ShippingInfo;