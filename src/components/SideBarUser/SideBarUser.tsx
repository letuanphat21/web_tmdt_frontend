import {
  User,
  MessageCircle,
  Landmark,
  Bell,
  TicketCheck,
  CirclePlus,
  List,
  Van,
  Heart,
  ShoppingCart,
} from "lucide-react";
import HorizontalDivider from "../common/HorizontalDivider";
import MenuItem from "./MenuItem/MenuItem";

function SideBarUser() {
  return (
    <div className="pt-8 flex flex-col gap-2">
      <span className="p-2">Cài đặt</span>

      <MenuItem
        to="/profile/information"
        icon={<User size={20} />}
        text="Hồ sơ của tôi"
      />
      <MenuItem
        to="/messages"
        icon={<MessageCircle size={20} />}
        text="Tin nhắn"
      />
      <MenuItem
        to="/profile/wallet"
        icon={<Landmark size={20} />}
        text="Tiền của tôi"
      />
      <MenuItem
        to="/profile/notifications"
        icon={<Bell size={20} />}
        text="Thông báo"
      />
      <MenuItem
        to="/profile/promotions"
        icon={<TicketCheck size={20} />}
        text="Các khuyến mãi"
      />

      <HorizontalDivider />

      <span className="p-2">Bán hàng</span>

      <MenuItem
        to="/add-product"
        icon={<CirclePlus size={20} />}
        text="Thêm sản phẩm"
      />
      <MenuItem
        to="/products"
        icon={<List size={20} />}
        text="Tất cả sản phẩm"
      />
      <MenuItem
        to="/profile/sell-orders"
        icon={<Van size={20} />}
        text="Đơn bán"
      />

      <HorizontalDivider />

      <span className="p-2">Mua hàng</span>

      <MenuItem to="/favorites" icon={<Heart size={20} />} text="Yêu thích" />
      <MenuItem
        to="/buy-orders"
        icon={<ShoppingCart size={20} />}
        text="Đơn mua"
      />

      <div className="mt-4 flex items-center justify-center">
        <button className="bg-[#4E6A4E] text-white px-5 h-10 rounded-full font-medium w-fit hover:cursor-pointer hover:opacity-80">
          Đăng xuất
        </button>
      </div>
    </div>
  );
}

export default SideBarUser;
