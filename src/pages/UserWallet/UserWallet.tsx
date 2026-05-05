import { useMemo, useState } from "react";

type Transaction = {
  id: number;
  date: string;
  detail: string;
  status: string;
  amount: string;
  type: "inflow" | "outflow";
};

const sampleTransactions: Transaction[] = [
  {
    id: 1,
    date: "2026-04-29",
    detail: "Nhận tiền tháng 1",
    status: "Thành công",
    amount: "- 1.250.000đ",
    type: "outflow",
  },
  {
    id: 2,
    date: "2026-04-27",
    detail: "Nhận hoa hồng bán hàng",
    status: "Hoàn thành",
    amount: "+ 2.000.000đ",
    type: "inflow",
  },
];

function UserWallet() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filteredTransactions = useMemo(() => {
    return sampleTransactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      if (from && transactionDate < from) {
        return false;
      }
      if (to && transactionDate > to) {
        return false;
      }
      return true;
    });
  }, [fromDate, toDate]);

  const transactionCount = filteredTransactions.length;

  return (
    <div className="py-16 px-12">
      <div className="flex flex-col gap-3">
        <div className="text-sm text-slate-500">
          Trang chủ &gt; Tiền của tôi
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">
          Túi tiền của tôi
        </h1>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="rounded-3xl bg-[#ECF9E7] p-6 shadow-sm">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Số dư của bạn</span>
            <span className="text-xl">💰</span>
          </div>
          <div className="mt-6 text-4xl font-extrabold text-slate-900">
            12.500.000₫
          </div>
          <div className="mt-2 text-sm text-emerald-700">
            ↑ Tăng 15% so với tháng trước
          </div>
        </div>

        <div className="rounded-3xl bg-[#ECF9E7] p-6 shadow-sm">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Điểm</span>
            <span className="text-xl">🎁</span>
          </div>
          <div className="mt-6 text-4xl font-extrabold text-slate-900">45</div>
          <div className="mt-2 text-sm text-slate-600">Đã hoàn thành 40</div>
        </div>

        <div className="rounded-3xl bg-[#ECF9E7] p-6 shadow-sm">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Lượt xem shop</span>
            <span className="text-xl">👀</span>
          </div>
          <div className="mt-6 text-4xl font-extrabold text-slate-900">
            1,240
          </div>
          <div className="mt-2 text-sm text-emerald-700">↑ Tăng 5%</div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 mt-8">
        <div className="col-span-8 rounded-[24px] bg-[#ECF9E7] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-slate-600">Biểu đồ doanh thu</div>
              <div className="mt-2 text-xl font-semibold text-slate-900">
                Theo tháng
              </div>
            </div>
            <div className="text-sm text-slate-500">Tháng gần nhất</div>
          </div>

          <div className="rounded-3xl bg-white p-4">
            <svg viewBox="0 0 700 260" className="w-full h-56">
              <path
                d="M40 215 C100 170 160 180 220 140 C280 110 340 120 400 95 C460 80 520 110 580 70 C640 35 700 50 760 40"
                fill="none"
                stroke="#2F855A"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <line
                x1="40"
                y1="220"
                x2="720"
                y2="220"
                stroke="#CBD5E1"
                strokeWidth="1"
              />
              <line
                x1="40"
                y1="40"
                x2="40"
                y2="220"
                stroke="#CBD5E1"
                strokeWidth="1"
              />
              <text x="40" y="238" className="text-xs fill-slate-500">
                Jan
              </text>
              <text x="140" y="238" className="text-xs fill-slate-500">
                Feb
              </text>
              <text x="240" y="238" className="text-xs fill-slate-500">
                Mar
              </text>
              <text x="340" y="238" className="text-xs fill-slate-500">
                Apr
              </text>
              <text x="440" y="238" className="text-xs fill-slate-500">
                May
              </text>
              <text x="540" y="238" className="text-xs fill-slate-500">
                Jun
              </text>
              <text x="640" y="238" className="text-xs fill-slate-500">
                Jul
              </text>
            </svg>
          </div>
        </div>

        <div className="col-span-4 rounded-3xl bg-[#ECF9E7] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-slate-600">Tỷ lệ danh mục</div>
              <div className="mt-2 text-xl font-semibold text-slate-900">
                Phân bổ
              </div>
            </div>
            <span className="text-sm text-slate-500">Đơn vị %</span>
          </div>

          <div className="rounded-3xl bg-white p-6">
            <div className="relative flex items-center justify-center mb-6">
              <div className="w-40 h-40 rounded-full bg-emerald-100"></div>
              <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-slate-900">
                62%
              </div>
            </div>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex items-center justify-between">
                <span>Áo</span>
                <span>62%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Quần</span>
                <span>41.52%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Giày dép</span>
                <span>14.27%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Túi xách</span>
                <span>71.97%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Khác</span>
                <span>22.59%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm mt-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xl font-semibold text-slate-900">
              Giao dịch của bạn
            </div>
            <div className="mt-1 text-sm text-slate-500">
              Hiển thị {transactionCount} giao dịch theo bộ lọc
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <label className="flex flex-col gap-2 text-sm text-slate-600">
              Từ ngày
              <input
                type="date"
                value={fromDate}
                onChange={(event) => setFromDate(event.target.value)}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-primary"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-600">
              Đến ngày
              <input
                type="date"
                value={toDate}
                onChange={(event) => setToDate(event.target.value)}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-primary"
              />
            </label>
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => {
                  setFromDate("");
                  setToDate("");
                }}
                className="w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Xóa bộ lọc
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-180 border-separate border-spacing-y-3 text-left text-sm">
            <thead>
              <tr className="text-slate-500">
                <th className="px-4 py-3">Ngày</th>
                <th className="px-4 py-3">Chi tiết</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3 text-right">Giá trị</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="rounded-2xl bg-slate-50">
                  <td className="px-4 py-4 text-slate-700">
                    {transaction.date}
                  </td>
                  <td className="px-4 py-4 text-slate-700">
                    {transaction.detail}
                  </td>
                  <td className="px-4 py-4 text-slate-700">
                    {transaction.status}
                  </td>
                  <td
                    className={`px-4 py-4 text-right font-semibold ${transaction.type === "inflow" ? "text-emerald-700" : "text-slate-900"}`}
                  >
                    {transaction.amount}
                  </td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-slate-500"
                  >
                    Không có giao dịch phù hợp với bộ lọc.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserWallet;
