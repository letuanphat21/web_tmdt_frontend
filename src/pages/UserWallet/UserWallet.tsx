import { useMemo, useState, useEffect } from "react";
// Import thư viện vẽ biểu đồ
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
// Import 2 API vừa định nghĩa
import { getDoanhThuTheoDanhMuc, getDoanhThuSeller, type DoanhThuDanhMuc, type DoanhThuNgay } from '@/services/thongKeService';

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

// Bảng màu Tone xanh lá (Match với OReMA)
const COLORS = ['#49613E', '#809B71', '#A6C496', '#CDE5C0', '#34D399'];

function UserWallet() {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    // 1. State cho Biểu đồ Tròn (Danh mục)
    const [categoryData, setCategoryData] = useState<DoanhThuDanhMuc[]>([]);
    const [loadingCategories, setLoadingCategories] = useState(false);

    // 2. State cho Biểu đồ Cột (Theo ngày)
    const [dailyData, setDailyData] = useState<any[]>([]);
    const [loadingDaily, setLoadingDaily] = useState(false);

    // Giả định ID Seller đang đăng nhập (có thể thay bằng Redux/Context sau này)
    const maSeller = 1;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    // Gọi đồng thời cả 2 API khi load trang
    useEffect(() => {
        const fetchData = async () => {
            setLoadingCategories(true);
            setLoadingDaily(true);
            try {
                // Lấy dữ liệu cho Bánh Donut (tháng trước, năm sau)
                const resCat = await getDoanhThuTheoDanhMuc(maSeller, currentMonth, currentYear);
                setCategoryData(resCat);

                // Lấy dữ liệu cho Biểu đồ Cột (NĂM TRƯỚC, THÁNG SAU - Đúng hàm của bạn)
                const resDaily = await getDoanhThuSeller(maSeller, currentYear, currentMonth);
                // Format lại chữ "Ngày" cho hiển thị đẹp trên trục X
                const formattedDaily = resDaily.map(item => ({
                    name: `Ngày ${item.ngay}`,
                    doanhThu: item.doanhThu
                }));
                setDailyData(formattedDaily);

            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu thống kê:", error);
            } finally {
                setLoadingCategories(false);
                setLoadingDaily(false);
            }
        };
        fetchData();
    }, [currentMonth, currentYear]);

    // Tính tổng để chia % cho biểu đồ tròn
    const totalCategoryRevenue = useMemo(() => {
        return categoryData.reduce((sum, item) => sum + item.doanhThu, 0);
    }, [categoryData]);

    // Format tiền tệ khi hover chuột vào biểu đồ
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tooltipFormatter = (value: any): [string, string] => {
        const numericValue = typeof value === 'number' ? value : (Number(value) || 0);
        return [`${numericValue.toLocaleString('vi-VN')} đ`, "Doanh thu"];
    };

    const filteredTransactions = useMemo(() => {
        return sampleTransactions.filter((transaction) => {
            const transactionDate = new Date(transaction.date);
            const from = fromDate ? new Date(fromDate) : null;
            const to = toDate ? new Date(toDate) : null;
            if (from && transactionDate < from) return false;
            if (to && transactionDate > to) return false;
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
                {/* --- KHU VỰC 1: BIỂU ĐỒ CỘT (DOANH THU THEO NGÀY) --- */}
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

                    <div className="rounded-3xl bg-white p-4 h-72">
                        {loadingDaily ? (
                            <div className="flex justify-center items-center h-full text-[#49613E] font-bold">Đang tải dữ liệu...</div>
                        ) : dailyData.length === 0 ? (
                            <div className="flex justify-center items-center h-full text-gray-400">Chưa có giao dịch trong tháng này</div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={dailyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12, fill: '#64748B' }}
                                        dy={10}
                                    />
                                    <YAxis
                                        tickFormatter={(value) => `${(value / 1000)}k`} // Rút gọn 500.000 thành 500k cho đẹp
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12, fill: '#64748B' }}
                                        dx={-10}
                                    />
                                    <Tooltip
                                        formatter={tooltipFormatter}
                                        cursor={{ fill: '#F1F5F9' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Bar
                                        dataKey="doanhThu"
                                        fill="#49613E"
                                        radius={[6, 6, 0, 0]}
                                        barSize={40}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

                {/* --- KHU VỰC 2: BIỂU ĐỒ TRÒN (TỶ LỆ DANH MỤC) --- */}
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
                        {loadingCategories ? (
                            <div className="flex justify-center items-center h-40 text-[#49613E] font-bold">Đang tải...</div>
                        ) : categoryData.length === 0 ? (
                            <div className="flex justify-center items-center h-40 text-gray-400">Chưa có dữ liệu</div>
                        ) : (
                            <>
                                <div className="relative flex items-center justify-center mb-6 h-48">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={categoryData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={50}
                                                outerRadius={80}
                                                paddingAngle={3}
                                                dataKey="doanhThu"
                                                nameKey="tenDanhMuc"
                                            >
                                                {categoryData.map((_entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                formatter={tooltipFormatter}
                                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="space-y-3 text-sm text-slate-700 max-h-32 overflow-y-auto pr-2">
                                    {categoryData.map((item, index) => {
                                        const percent = ((item.doanhThu / totalCategoryRevenue) * 100).toFixed(1);
                                        return (
                                            <div key={index} className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                        <span
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                        ></span>
                                                    <span className="font-medium">{item.tenDanhMuc}</span>
                                                </div>
                                                <span className="font-bold">{percent}%</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* --- BẢNG GIAO DỊCH (GIỮ NGUYÊN) --- */}
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