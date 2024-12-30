import React from "react";

export default function DonePayment() {
  // Sample order details
  const orderDetails = {
    recipient: "Duc",
    address: ["20 Đỗ Nhuận", "Xã Đại Đồng", "Huyện Tiên Du, Bắc Ninh"],
    note: "Sao đặt hàng xong không",
    paymentMethod: "Tiền mặt (COD)",
    totalPayment: "1.618.200 ₫",
    email: "dfsdfs@gmail.com",
  };

  const products = [
    {
      id: 1,
      name: "Phao Vip Nữ Lông Vũ Tay",
      price: "1.169.100 ₫",
      oldPrice: "1.299.000 ₫",
      quantity: 1,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Quần Âu Nữ Suông Kèm Đại",
      price: "449.100 ₫",
      oldPrice: "499.000 ₫",
      quantity: 1,
      image: "https://via.placeholder.com/100",
    },
  ];

  const summary = {
    totalProducts: "1.618.200 ₫",
    shippingFee: "20.000 ₫",
    discountShipping: "-20.000 ₫",
    total: "1.618.200 ₫",
    savings: "199.800 ₫",
  };
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 text-green-500 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4M7 12a5 5 0 11.001-10.001A5 5 0 017 12zm7-5h7m-7 4h7m-7 4h4"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Cảm ơn bạn đã mua sắm tại Yody
          </h1>
        </div>

        {/* Order Confirmation */}
        <div className="mt-6 flex flex-col lg:flex-row lg:space-x-8">
          {/* Left Section */}
          <div className="w-full lg:w-2/3">
            <div className="bg-gray-50 p-4 rounded-lg shadow mb-6">
              <h2 className="text-lg font-medium">Đơn hàng đã được xác nhận</h2>
              <p className="text-gray-500 text-sm mt-1">
                Bạn có thể xem lại thông tin chi tiết đơn hàng qua website YODY
                hoặc liên hệ đến hotline{" "}
                <span className="text-gray-700 font-medium">
                  024 999 86 999
                </span>
              </p>
              <button className="mt-4 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium">
                Tiếp tục mua sắm
              </button>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">Thông tin chi tiết</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <span className="font-medium text-gray-700">Người nhận:</span>{" "}
                  {orderDetails.recipient}
                </li>
                <li>
                  <span className="font-medium text-gray-700">
                    Địa chỉ nhận hàng:
                  </span>
                  {orderDetails.address.map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </li>
                <li>
                  <span className="font-medium text-gray-700">Ghi chú:</span>{" "}
                  {orderDetails.note}
                </li>
                <li>
                  <span className="font-medium text-gray-700">
                    Phương thức thanh toán:
                  </span>{" "}
                  {orderDetails.paymentMethod} - {orderDetails.totalPayment}
                </li>
                <li>
                  <span className="font-medium text-gray-700">Email:</span>{" "}
                  {orderDetails.email}
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/3">
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Chi tiết sản phẩm</h3>
              <div className="space-y-4">
                {products.map((product) => (
                  <div className="flex items-center space-x-4" key={product.id}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-grow">
                      <h4 className="text-gray-700 font-medium truncate">
                        {product.name}
                      </h4>
                      <div className="text-red-500 font-bold">
                        {product.price}
                      </div>
                      <div className="text-gray-400 line-through">
                        {product.oldPrice}
                      </div>
                    </div>
                    <div>x{product.quantity}</div>
                  </div>
                ))}
              </div>
              <hr className="my-4" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Tổng giá trị sản phẩm</span>
                  <span>{summary.totalProducts}</span>
                </div>
                <div className="flex justify-between">
                  <span>Vận chuyển</span>
                  <span>{summary.shippingFee}</span>
                </div>
                <div className="flex justify-between text-red-500">
                  <span>Giảm giá vận chuyển</span>
                  <span>{summary.discountShipping}</span>
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between text-lg font-semibold">
                <span>Tổng thanh toán</span>
                <span>{summary.total}</span>
              </div>
              <div className="text-sm text-red-500 mt-1">
                Bạn đã tiết kiệm được {summary.savings}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
