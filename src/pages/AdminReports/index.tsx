import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Dữ liệu giả lập cho biểu đồ (Mock data)
const monthlyRevenueData = [
    { name: 'Jan', value: 1300000 },
    { name: 'Feb', value: 2400000 },
    { name: 'Mar', value: 1400000 },
    { name: 'Apr', value: 1550000 },
    { name: 'May', value: 2450000 },
    { name: 'Jun', value: 1100000 },
];

const productRevenueData = [
    { name: 'Áo', value: 1300000 },
    { name: 'Quần', value: 2400000 },
    { name: 'Váy', value: 1400000 },
    { name: 'Giày', value: 1550000 },
    { name: 'Túi', value: 2450000 },
    { name: 'Phụ kiện', value: 1100000 },
];

const AdminReports = () => {
    return (
        <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto pt-4 pb-12">

            {/* 1. Breadcrumb */}
            <div className="flex items-center gap-3 text-sm">
                <span className="text-gray-500">Kênh ADMIN</span>
                <span className="text-gray-400 font-bold">›</span>
                <span className="font-bold text-[#1A1C19]">Thống kê báo cáo</span>
            </div>

            {/* 2. Các thẻ chỉ số tổng quát (Summary Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-[#EBF5E4] rounded-2xl p-6 flex flex-col gap-2">
                    <span className="text-gray-700 font-medium text-lg">Doanh thu</span>
                    <span className="text-4xl font-bold text-[#49613E]">94.312$</span>
                </div>
                <div className="bg-[#EBF5E4] rounded-2xl p-6 flex flex-col gap-2">
                    <span className="text-gray-700 font-medium text-lg">Tổng Đơn hàng</span>
                    <span className="text-4xl font-bold text-[#49613E]">43.45M</span>
                </div>
                <div className="bg-[#EBF5E4] rounded-2xl p-6 flex flex-col gap-2">
                    <span className="text-gray-700 font-medium text-lg">Khách hàng</span>
                    <span className="text-4xl font-bold text-[#49613E]">175.3M</span>
                </div>
                <div className="bg-[#EBF5E4] rounded-2xl p-6 flex flex-col gap-2">
                    <span className="text-gray-700 font-medium text-lg">Cửa hàng</span>
                    <span className="text-4xl font-bold text-[#49613E]">9273</span>
                </div>
            </div>

            {/* 3. Biểu đồ 1: Doanh thu theo tháng */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold text-[#1A1C19]">Biểu đồ doanh thu theo tháng</h3>
                <div className="bg-[#EBF5E4] rounded-2xl p-6 w-full h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyRevenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#C4D7B5" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#666', fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#666', fontSize: 12 }}
                                dx={-10}
                            />
                            {/* Bổ sung Tooltip: Rê chuột vào sẽ hiện số chi tiết */}
                            <Tooltip
                                contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#98B880"
                                strokeWidth={3}
                                dot={{ fill: '#EBF5E4', stroke: '#98B880', strokeWidth: 3, r: 5 }}
                                activeDot={{ r: 8, fill: '#49613E', stroke: 'white' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 4. Biểu đồ 2: Doanh thu theo sản phẩm */}
            <div className="flex flex-col gap-4 mt-4">
                <h3 className="text-xl font-bold text-[#1A1C19]">Biểu đồ doanh thu theo sản phẩm</h3>
                <div className="bg-[#EBF5E4] rounded-2xl p-6 w-full h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={productRevenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#C4D7B5" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#666', fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#666', fontSize: 12 }}
                                dx={-10}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#98B880"
                                strokeWidth={3}
                                dot={{ fill: '#EBF5E4', stroke: '#98B880', strokeWidth: 3, r: 5 }}
                                activeDot={{ r: 8, fill: '#49613E', stroke: 'white' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
};

export default AdminReports;