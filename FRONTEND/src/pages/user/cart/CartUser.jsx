import React from "react";

const Cart = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 px-4">
        {/* Thông báo miễn phí vận chuyển */}
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <p className="text-green-600 font-medium">
            🎉 Chúc mừng! Đơn hàng của bạn được{" "}
            <span className="font-bold">Miễn phí vận chuyển</span>
          </p>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: "100%" }}
            ></div>
          </div>
        </div>

        {/* Khuyến mại */}
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 text-orange-500 font-medium">
            🔥
            <span>Khuyến mại trong giỏ hàng của bạn chỉ còn</span>
            <span className="font-bold text-black">3 phút 35 giây</span>
            <span>trước khi hết khuyến mại</span>
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="font-bold text-lg mb-4">Đang được giảm giá</h2>

          {/* Sản phẩm */}
          <div className="space-y-4">
            {/* Sản phẩm 1 */}
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-4">
                <input type="checkbox" className="h-5 w-5" />
                <img
                  src="https://via.placeholder.com/80"
                  alt="Product"
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">
                    Áo Khoác Gió Nữ 3C Plus Năng Động
                  </h3>
                  <p className="text-sm text-gray-500">Xanh trời, M</p>
                  <div className="text-red-500 font-bold">349.300đ</div>
                  <div className="text-gray-400 line-through text-sm">
                    499.000đ
                  </div>
                  <p className="text-sm text-orange-500">
                    Đã tiết kiệm 149.700đ
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-lg bg-gray-200 px-3 py-1 rounded">
                  -
                </button>
                <span>1</span>
                <button className="text-lg bg-gray-200 px-3 py-1 rounded">
                  +
                </button>
              </div>
            </div>

            {/* Sản phẩm 2 */}
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-4">
                <input type="checkbox" className="h-5 w-5" />
                <img
                  src="https://via.placeholder.com/80"
                  alt="Product"
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">
                    Áo Phao Nam Có Mũ Siêu Nhẹ Siêu Ấm
                  </h3>
                  <p className="text-sm text-gray-500">Ghi Đậm, M</p>
                  <div className="text-red-500 font-bold">419.300đ</div>
                  <div className="text-gray-400 line-through text-sm">
                    599.000đ
                  </div>
                  <p className="text-sm text-orange-500">
                    Đã tiết kiệm 179.700đ
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-lg bg-gray-200 px-3 py-1 rounded">
                  -
                </button>
                <span>1</span>
                <button className="text-lg bg-gray-200 px-3 py-1 rounded">
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tổng đơn hàng */}
        <div className="bg-white shadow rounded-lg p-6 mt-6">
          <h2 className="font-bold text-lg mb-4">Chi tiết đơn hàng</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Tổng giá trị sản phẩm</span>
              <span className="font-bold">2.324.450đ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Vận chuyển</span>
              <span className="font-bold">20.000đ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Giảm giá vận chuyển</span>
              <span className="font-bold text-red-500">-20.000đ</span>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <span className="font-bold text-lg">Tổng thanh toán</span>
            <span className="font-bold text-lg text-red-500">2.324.450đ</span>
          </div>
          <button className="bg-yellow-500 text-white font-bold w-full py-3 rounded-lg mt-4">
            Mua hàng (5)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
