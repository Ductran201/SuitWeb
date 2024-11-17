import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../../services/productService";
import HeaderShop from "../../layouts/user/headerShop/HeaderShop";
import FooterShop from "../../layouts/user/footerShop/FooterShop";

export default function ProductDetail() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { productInfor } = useSelector((state) => state.product);

  const [selectedImage, setSelectedImage] = useState(productInfor?.images[0]);
  const [selectedColor, setSelectedColor] = useState(
    productInfor?.colorSet[0].id
  );
  const [selectedSize, setSelectedSize] = useState(productInfor?.sizeSet[0].id);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value) => {
    if (value >= 1 && value <= 100) {
      setQuantity(value);
    }
  };

  const loadData = async () => {
    dispatch(findProductById(id));
    setColorSet(productInfor?.colorSet);
    setSizeSet(productInfor?.sizeSet);
  };

  useEffect(() => {
    loadData();
  }, []);

  console.log("123", productInfor);

  return (
    <>
      <HeaderShop />
      <p>link....</p>

      <section className="grid grid-cols-2 gap-5 px-[100px]">
        {/* Bộ sưu tập hình ảnh */}
        <div className="flex gap-2">
          <div>
            {productInfor?.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumbnail-${index}`}
                onClick={() => setSelectedImage(img)}
                className={`w-[50px] h-[50px] cursor-pointer ${
                  img === selectedImage ? "border-2 border-black" : ""
                }`}
              />
            ))}
          </div>
          <div>
            <img
              src={selectedImage}
              alt="selected-product"
              className=" h-svh object-cover"
            />
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div>
          <h2 className="text-2xl font-bold">{productInfor?.product.name}</h2>
          <p className="text-lg font-semibold text-gray-600">
            {productInfor?.productDetailAllResponse[0].productDetail.price} đ
          </p>

          {/* Chọn màu sắc */}
          <div className="mt-4">
            <h4 className="font-medium">Màu sắc:</h4>
            <div className="flex gap-2 mt-2">
              {productInfor?.colorSet.map((color) => (
                <button
                  key={color.id}
                  style={{
                    backgroundColor: color.name,
                  }}
                  className={`w-8 h-8 rounded-full ${
                    color.id === selectedColor ? "ring-2 ring-black" : ""
                  }`}
                  onClick={() => setSelectedColor(color.id)}
                ></button>
              ))}
            </div>
          </div>

          {/* Chọn kích thước */}
          <div className="mt-4">
            <h4 className="text-lg font-medium">Kích thước:</h4>
            <div className="flex gap-2 mt-2">
              {productInfor?.sizeSet.map((size) => (
                <button
                  key={size.id}
                  className={`px-3 py-1 border ${
                    size.id === selectedSize
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedSize(size.id)}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>

          {/* Chọn số lượng */}
          <div className="mt-4">
            <h4 className="text-lg font-medium">
              Số lượng:{" "}
              {
                productInfor?.productDetailAllResponse[0].productDetail
                  .stockQuantity
              }
            </h4>
            <div className="flex gap-2 mt-2">
              <button
                className="px-2 py-1 border border-gray-300"
                onClick={() => handleQuantityChange(quantity - 1)}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
                className="w-16 text-center border border-gray-300"
              />
              <button
                className="px-2 py-1 border border-gray-300"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Nút thêm vào giỏ và mua ngay */}
          <div className="mt-4 space-y-2">
            <button className="w-full bg-orange-500 text-white py-2 cursor-pointer">
              Thêm vào giỏ
            </button>
            <button className="w-full bg-orange-500 text-white py-2 cursor-pointer">
              Mua ngay
            </button>
          </div>
        </div>
      </section>
      <FooterShop />
    </>
  );
}
