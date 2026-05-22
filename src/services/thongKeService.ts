import axiosClient from "../service/axiosClient"; // Sửa lại đường dẫn này nếu thư mục của bạn khác

// --- Kiểu dữ liệu và API cho Biểu đồ Cột (Doanh thu theo ngày) ---
export interface DoanhThuNgay {
    ngay: number;
    doanhThu: number;
}

export const getDoanhThuSeller = async (maSeller: number, nam: number, thang: number): Promise<DoanhThuNgay[]> => {
    const response = await axiosClient.get<DoanhThuNgay[]>(`/api/thong-ke/seller/${maSeller}`, {
        params: { nam, thang }
    });
    // Trả về data (tùy thuộc vào cấu hình interceptor của bạn, nếu lỗi undefine thì đổi thành "return response as any")
    return response.data ?? response as any;
};


// --- Kiểu dữ liệu và API cho Biểu đồ Tròn (Doanh thu theo danh mục) ---
export interface DoanhThuDanhMuc {
    tenDanhMuc: string;
    doanhThu: number;
}

export const getDoanhThuTheoDanhMuc = async (maSeller: number, thang: number, nam: number): Promise<DoanhThuDanhMuc[]> => {
    const response = await axiosClient.get(`/api/thong-ke/seller/${maSeller}/danh-muc`, {
        params: { thang, nam }
    });
    return response as unknown as DoanhThuDanhMuc[];
};