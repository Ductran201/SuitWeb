import React from "react";

export default function RelatedProduct() {
  const products = [
    {
      id: 1,
      name: "Phao Vip Nữ Dáng Ngắn Dây Rút Mũ",
      price: "890.100 đ",
      oldPrice: "989.000 đ",
      colors: ["bg-red-500", "bg-black", "bg-gray-300"],
      image: "link_to_image_1", // Replace with your image URL
      discount: "-10%",
    },
    {
      id: 2,
      name: "Phao Vip Nữ Lông Vũ Tay Raglan Có Mũ",
      price: "1.169.100 đ",
      oldPrice: "1.299.000 đ",
      colors: ["bg-white", "bg-red-500", "bg-navy"],
      image: "link_to_image_2", // Replace with your image URL
      discount: "-10%",
    },
    {
      id: 3,
      name: "Quần Kaki Kid Cơ Bản",
      price: "359.100 đ",
      oldPrice: "399.000 đ",
      colors: ["bg-black", "bg-gray-300", "bg-green-500"],
      image: "link_to_image_3", // Replace with your image URL
      discount: "-10%",
    },
    {
      id: 4,
      name: "Áo Khoác Gió Nam 2 Lớp Siêu Co Giãn",
      price: "692.100 đ",
      oldPrice: "769.000 đ",
      colors: ["bg-black", "bg-blue-500", "bg-gray-300"],
      image: "link_to_image_4", // Replace with your image URL
      discount: "-10%",
    },
    {
      id: 5,
      name: "Áo Khoác Gió Nam 2 Lớp Siêu Co Giãn",
      price: "692.100 đ",
      oldPrice: "769.000 đ",
      colors: ["bg-black", "bg-blue-500", "bg-gray-300"],
      image: "link_to_image_4", // Replace with your image URL
      discount: "-10%",
    },
  ];
  return (
    <>
      <div className="p-5">
        <h2 className="text-2xl font-semibold mb-5">Đã xem gần đây</h2>
        <div className="flex space-x-4 overflow-x-scroll">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-64 border rounded-lg shadow-md p-4 relative"
            >
              {/* Discount */}
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-sm rounded">
                {product.discount}
              </div>

              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover rounded-md"
              />

              {/* Product Info */}
              <h3 className="mt-4 text-lg font-medium">{product.name}</h3>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-red-500 font-semibold">
                  {product.price}
                </span>
                <span className="line-through text-gray-500 text-sm">
                  {product.oldPrice}
                </span>
              </div>

              {/* Colors */}
              <div className="flex items-center space-x-2 mt-3">
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className={`h-6 w-6 rounded-full ${color} border`}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
