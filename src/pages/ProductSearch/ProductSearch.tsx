import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, Link } from "react-router-dom";
import { addItemToCart } from "@/redux/cartSlice/cartSlice";
import type { AppDispatch } from "@/redux/store";
import { ShoppingCart } from "lucide-react";

interface Product {
  maSanPham: number;
  tenSanPham: string;
  giaSanPham: number;
  soLuong: number;
  tenTinhTrang: string;
  hinhAnhDaiDien: string;
  maTheLoai?: number;
  maTinhTrang?: number;
}

interface Category {
  maTheLoai: number;
  tenTheLoai: string;
}

interface Status {
  maTinhTrang: number;
  tenTinhTrang: string;
}

const ProductSearch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSearchingByImage, setIsSearchingByImage] = useState(false);

  // Quantity state for add to cart
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  // Initialize selectedCategories from URL parameter
  const getInitialCategories = () => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      const categoryId = parseInt(categoryParam, 10);
      if (!isNaN(categoryId)) {
        return [categoryId];
      }
    }
    return [];
  };

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<number[]>(getInitialCategories());
  const [selectedStatuses, setSelectedStatuses] = useState<number[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);

  // Load initial data (categories, statuses, products)
  useEffect(() => {
    // Lấy danh sách sản phẩm
    const token = localStorage.getItem("token");
    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    fetch("http://localhost:8080/api/products/search", { headers })
      .then((res) => res.json())
      .then((data) => {
        const productsData = data.data.content || [];
        setAllProducts(productsData);
      })
      .catch((err) => console.error("Lỗi products:", err));

    // Lấy danh mục + tình trạng
    Promise.all([
      fetch("http://localhost:8080/api/home/categories").then((res) =>
        res.json(),
      ),
      fetch("http://localhost:8080/api/statuses").then((res) => res.json()),
    ])
      .then(([categoryData, statusData]) => {
        setCategories(categoryData.data || []);
        setStatuses(statusData.data || []);
      })
      .catch((err) => console.error("Lỗi filters:", err));
  }, []);

  // Apply filters and search using useMemo
  const products = useMemo(() => {
    let filtered = [...allProducts];

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter((item) =>
        item.tenSanPham.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((item) =>
        selectedCategories.includes(item.maTheLoai || 0),
      );
    }

    // Filter by statuses
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter((item) =>
        selectedStatuses.includes(item.maTinhTrang || 0),
      );
    }

    // Filter by price range
    if (minPrice) {
      const min = parseFloat(minPrice);
      filtered = filtered.filter((item) => item.giaSanPham >= min);
    }
    if (maxPrice) {
      const max = parseFloat(maxPrice);
      filtered = filtered.filter((item) => item.giaSanPham <= max);
    }

    // Sort
    if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.giaSanPham - b.giaSanPham);
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.giaSanPham - a.giaSanPham);
    }
    // Default: "newest" - keep original order

    return filtered;
  }, [
    searchTerm,
    selectedCategories,
    selectedStatuses,
    minPrice,
    maxPrice,
    sortBy,
    allProducts,
  ]);

  // Handle category filter
  const handleCategoryChange = (categoryId: number, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, categoryId] : prev.filter((id) => id !== categoryId),
    );
  };

  // Handle status filter
  const handleStatusChange = (statusId: number, checked: boolean) => {
    setSelectedStatuses((prev) =>
      checked ? [...prev, statusId] : prev.filter((id) => id !== statusId),
    );
  };

  // Handle price filter
  const handleApplyPrice = () => {
    // This will trigger the useEffect above due to minPrice/maxPrice state change
  };

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Vui lòng chọn một file hình ảnh');
        return;
      }
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle search by image
  const handleSearchByImage = async () => {
    if (!uploadedImage) {
      alert('Vui lòng chọn một hình ảnh');
      return;
    }

    setIsSearchingByImage(true);
    const formData = new FormData();
    formData.append('image', uploadedImage);
    formData.append('threshold', '0.4'); // Fixed threshold: 0.4

    try {
      const token = localStorage.getItem("token");
      const headers: Record<string, string> = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch('http://localhost:8080/api/products/search-by-image', {
        method: 'POST',
        body: formData,
        headers,
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      const responseText = await response.text();
      console.log('Raw response text:', responseText);
      
      if (!response.ok) {
        alert(`Lỗi API: ${response.status} - ${responseText}`);
        return;
      }

      if (!responseText) {
        alert('Server trả về response trống');
        return;
      }

      const data = JSON.parse(responseText);
      console.log('Image search response:', data);
      if (data.success) {
        const products = data.data || [];
        console.log('Found products:', products.length);
        setAllProducts(products);
        if (products.length === 0) {
          alert('Không tìm thấy sản phẩm phù hợp (0 kết quả)');
        }
      } else {
        alert('Không tìm thấy sản phẩm phù hợp: ' + data.message);
      }
    } catch (error) {
      console.error('Lỗi tìm kiếm theo hình ảnh:', error);
      alert('Lỗi khi tìm kiếm theo hình ảnh');
    } finally {
      setIsSearchingByImage(false);
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setSelectedStatuses([]);
    setMinPrice("");
    setMaxPrice("");
    setSortBy("newest");
  };

  // Handle quantity change
  const handleQuantityChange = (productId: number, value: string) => {
    const qty = parseInt(value) || 0;
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, Math.min(qty, 100)),
    }));
  };

  // Handle add to cart
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 2500);
  };

  const handleAddToCart = async (product: Product) => {
    const quantity = quantities[product.maSanPham] || 1;
    try {
      await dispatch(
        addItemToCart({
          maSanPham: product.maSanPham,
          soLuong: quantity,
        }),
      );
      showToast("success", `Đã thêm "${product.tenSanPham}" vào giỏ hàng!`);
      setQuantities((prev) => ({
        ...prev,
        [product.maSanPham]: 1,
      }));
    } catch (err) {
      console.error("Lỗi thêm vào giỏ hàng:", err);
      showToast("error", "Không thể thêm vào giỏ hàng. Vui lòng đăng nhập!");
    }
  };

  return (
    <div className="bg-[#F9FAF4] min-h-screen py-8">
      {/* Toast notification */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium transition-all ${toast.type === "success" ? "bg-[#49613E]" : "bg-red-500"}`}>
          {toast.type === "success" ? "✓" : "✕"} {toast.msg}
        </div>
      )}
      <div className="max-w-[1200px] mx-auto px-6">
        {/* SEARCH BAR */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Tìm kiếm áo khoác, quần jean, phụ kiện..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:border-[#49613E] shadow-sm"
            />

            <button
              onClick={() => {
                // Search is already triggered by useEffect
              }}
              className="px-8 py-4 bg-[#49613E] text-white rounded-full font-bold cursor-pointer hover:bg-[#3a4d31] transition-all"
            >
              Tìm kiếm
            </button>

            {/* Image Search Button */}
            <label className="px-6 py-4 bg-blue-100 text-blue-700 rounded-full font-bold cursor-pointer hover:bg-blue-200 transition-all flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              📷 Tìm theo ảnh
            </label>
          </div>

          {/* Image Preview and Search Button */}
          {imagePreview && (
            <div className="flex gap-4 items-center bg-white p-4 rounded-2xl border border-gray-200">
              <img src={imagePreview} alt="Preview" className="w-16 h-16 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="text-sm text-gray-700 font-semibold">Tìm sản phẩm tương tự </p>
              </div>
              <button
                onClick={handleSearchByImage}
                disabled={isSearchingByImage}
                className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all disabled:opacity-50"
              >
                {isSearchingByImage ? 'Đang tìm...' : 'Tìm kiếm'}
              </button>
              <button
                onClick={() => {
                  setUploadedImage(null);
                  setImagePreview(null);
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-full transition-all"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-8">
          {/* FILTER SIDEBAR */}
          <div className="w-[280px] flex-shrink-0 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[18px] font-bold text-[#1A1C19]">Bộ Lọc</h2>

              <button
                onClick={handleClearFilters}
                className="text-sm text-gray-500 hover:text-[#49613E] cursor-pointer"
              >
                Xóa bộ lọc
              </button>
            </div>

            {/* CATEGORY FILTER */}
            <div className="mb-6 border-b border-gray-100 pb-6">
              <h3 className="font-semibold text-[#1A1C19] mb-4">Danh mục</h3>

              <div className="space-y-3">
                {categories.map((item) => (
                  <label
                    key={item.maTheLoai}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(item.maTheLoai)}
                      onChange={(e) =>
                        handleCategoryChange(item.maTheLoai, e.target.checked)
                      }
                      className="w-4 h-4 accent-[#49613E] cursor-pointer"
                    />

                    <span className="text-gray-700">{item.tenTheLoai}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* STATUS FILTER */}
            <div className="mb-6 border-b border-gray-100 pb-6">
              <h3 className="font-semibold text-[#1A1C19] mb-4">Tình trạng</h3>

              <div className="space-y-3">
                {statuses.map((item) => (
                  <label
                    key={item.maTinhTrang}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStatuses.includes(item.maTinhTrang)}
                      onChange={(e) =>
                        handleStatusChange(item.maTinhTrang, e.target.checked)
                      }
                      className="w-4 h-4 accent-[#49613E] cursor-pointer"
                    />

                    <span className="text-gray-700">{item.tenTinhTrang}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* PRICE FILTER */}
            <div>
              <h3 className="font-semibold text-[#1A1C19] mb-4">Khoảng giá</h3>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="TỪ"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full text-center border border-gray-300 rounded-lg py-2 focus:outline-none focus:border-[#49613E]"
                />

                <span>-</span>

                <input
                  type="text"
                  placeholder="ĐẾN"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full text-center border border-gray-300 rounded-lg py-2 focus:outline-none focus:border-[#49613E]"
                />
              </div>

              <button
                onClick={handleApplyPrice}
                className="w-full mt-4 bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-all cursor-pointer"
              >
                Áp dụng giá
              </button>
            </div>
          </div>

          {/* PRODUCT LIST */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[20px] font-bold text-[#1A1C19]">
                Kết quả tìm kiếm ({products.length} sản phẩm)
              </h2>

              <div className="flex items-center gap-3">
                <span className="text-gray-600">Sắp xếp theo:</span>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-[#49613E] cursor-pointer"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="price-asc">Giá: Thấp đến cao</option>
                  <option value="price-desc">Giá: Cao đến thấp</option>
                </select>
              </div>
            </div>

            {/* PRODUCT GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((item) => (
                <div
                  key={item.maSanPham}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <Link to={`/product/${item.maSanPham}`} className="block">
                    <div className="h-[250px] overflow-hidden relative">
                      <div className="absolute top-2 left-2 bg-[#49613E] text-white text-xs font-bold px-2 py-1 rounded z-10">
                        {item.tenTinhTrang}
                      </div>
                      <img
                        src={item.hinhAnhDaiDien ? item.hinhAnhDaiDien : "/images/placeholder.jpg"}
                        alt={item.tenSanPham}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="px-4 pt-4 pb-2">
                      <h3 className="text-gray-800 font-semibold truncate mb-1 group-hover:text-[#49613E] transition-colors">
                        {item.tenSanPham}
                      </h3>
                      <div className="flex justify-between items-center">
                        <span className="text-[#49613E] font-bold text-lg">
                          {item.giaSanPham.toLocaleString("vi-VN")}đ
                        </span>
                        <span className="text-xs text-gray-500 border border-gray-200 px-2 py-1 rounded">
                          SL: {item.soLuong}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="flex gap-2 px-4 pb-4">
                    <input
                      type="number"
                      min="1"
                      max={item.soLuong}
                      value={quantities[item.maSanPham] || 1}
                      onChange={(e) => handleQuantityChange(item.maSanPham, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-16 border border-gray-300 rounded px-2 py-1 text-center text-sm focus:outline-none focus:border-[#49613E]"
                    />
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 flex items-center justify-center bg-[#49613E] text-white text-sm font-semibold rounded py-2 hover:bg-[#3a4d31] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                      disabled={item.soLuong === 0}
                    >
                      {item.soLuong === 0 ? "Hết hàng" : <ShoppingCart size={20} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
