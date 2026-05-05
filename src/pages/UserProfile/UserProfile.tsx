import googleImage from "../../assets/image/google.png";
import { LeafyGreen } from "lucide-react";
function UserProfile() {
  const verificationProgress = 50;
  const circleRadius = 16;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const progressOffset =
    circleCircumference - (verificationProgress / 100) * circleCircumference;

  return (
    <div className="py-16 px-12">
      <div>
        Trang chủ &gt;{" "}
        <span className="text-brand-primary font-bold underline">
          Hồ sơ của tôi
        </span>
      </div>
      <div className="grid grid-cols-10 gap-3 mt-8">
        <div className="col-span-7">
          <div className="p-8 bg-white rounded-2xl flex flex-row items-center mb-12">
            {/* Hình ảnh */}
            <div>
              <img
                src="https://picsum.photos/200/300"
                className="rounded-full w-40 h-45 object-fill"
              />
            </div>
            {/* Thông tin cá nhân */}
            <div className="mx-8 flex flex-col gap-2">
              <h2 className="font-manrope text-3xl font-extrabold leading-9 tracking-tighter">
                Lê Tuấn Phát
              </h2>
              <span className="font-manrope leading-6">
                Thành viên từ tháng 10, 2023
              </span>
              <span className="px-4 py-1 bg-[#CEE9A2] rounded-2xl text-xs w-fit font-bold text-brand-primary">
                Người bán uy tín
              </span>
              <span className="px-4 py-1 bg-[#EBE2C4] rounded-2xl text-xs w-fit  font-bold text-brand-primary">
                Thời trang bên vững
              </span>
            </div>
            {/* Vòng tròn phần trăm */}
            <div className="ml-auto flex flex-col items-center gap-4">
              <div className="relative w-36 h-36">
                <svg viewBox="0 0 36 36" className="w-36 h-36">
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="4"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="#4E6A4E"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={circleCircumference}
                    strokeDashoffset={progressOffset}
                    transform="rotate(-90 18 18)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-[#1F2937]">
                    {verificationProgress}%
                  </span>
                  <span className="text-xs text-slate-500">Hoàn thành</span>
                </div>
              </div>
              <div>Xác minh hồ sơ</div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {/* phần 1 */}
            <div className="flex flex-row items-center justify-between">
              <div className="min-w-80">
                <span className="font-manrope font-bold text-[14px]">
                  Tên đầy đủ
                </span>
                <div className="mt-2 px-4 py-3 bg-brand-input rounded-2xl font-manrope font-medium leading-6">
                  Lê Tuấn Phát
                </div>
              </div>
              <div className="min-w-80">
                <span className="font-manrope font-bold text-[14px]">
                  Ngày sinh
                </span>
                <div className="mt-2 px-4 py-3 bg-brand-input rounded-2xl font-manrope font-medium leading-6">
                  05/15/1998
                </div>
              </div>
            </div>
            {/* Phần 2 */}
            <div className="flex flex-row items-center justify-between">
              <div className="min-w-80">
                <span className="font-manrope font-bold text-[14px]">
                  Giới tính
                </span>
                <ul className="flex flex-row items-center justify-between gap-3 bg-brand-input px-4  rounded-2xl">
                  <li className="bg-white text-brand-primary rounded-2xl px-5 py-3 font-bold hover:bg-white hover:text-brand-primary transition-all">
                    Nam
                  </li>
                  <li className="px-2 py-3 font-bold hover:bg-white hover:text-brand-primary transition-all">
                    Nữ
                  </li>
                  <li className="px-2 py-3 font-bold hover:bg-white hover:text-brand-primary transition-all">
                    Khác
                  </li>
                </ul>
              </div>
              <div className="min-w-80">
                <span className="font-manrope font-bold text-[14px]">
                  Ngôn ngữ
                </span>
                <div className="mt-2 px-4 py-3 bg-brand-input rounded-2xl font-manrope font-medium leading-6">
                  Tiếng Việt
                </div>
              </div>
            </div>
            {/* Địa chỉ */}
            <div>
              <span className="font-manrope font-bold text-[14px]">
                Địa chỉ
              </span>
              <p className="mt-2 px-4 py-3 bg-brand-input rounded-2xl font-manrope font-medium leading-6">
                123 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM
              </p>
            </div>
            {/* Giới thiệu bản thân */}
            <div>
              <span className="font-manrope font-bold text-[14px]">
                Giới thiệu bản thân
              </span>
              <p className="mt-2 px-4 py-3 min-h-50 overflow-y-auto bg-brand-input rounded-2xl font-manrope font-medium leading-6">
                Yêu thích phong cách tối giản và những món đồ vintage có câu
                chuyên riêng. Luôn ưu tiên những sản phẩm thân thiện với mỗi
                trường.
              </p>
            </div>
            {/* Nút lưu thay đổi */}
            <div className="mt-12 flex flex-row-reverse">
              <button className="bg-[#4E6A4E] text-white px-12 py-3 rounded-full font-medium hover:cursor-pointer hover:opacity-90">
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="p-6 bg-white rounded-2xl">
            <h1>Tài khoản liên kết</h1>
            <div className="flex flex-row items-center gap-4 p-3 bg-brand-input rounded-2xl">
              <img
                src={googleImage}
                alt="Hình ảnh google"
                className="w-5 h-5 object-fill"
              />
              <p className="mr-6">Google</p>
              <p>Kết nối</p>
            </div>
          </div>
          <div className="p-6 bg-brand-primary rounded-2xl mt-4">
            <div className="flex flex-row items-center text-white gap-2">
              <LeafyGreen size={20} />
              <h1 className="text-white">Mẹo hay</h1>
            </div>
            <div className="text-white">
              <p className="mr-6">
                Hồ sơ đầy đủ giúp tăng tỷ lệ chốt đơn của bạn tăng lên 40%. Hãy
                thêm một vài dòng về phòng cách thời trang của bạn nhé!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
