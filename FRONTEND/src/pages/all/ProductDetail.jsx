import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  findProductById,
  topNewestProduct,
} from "../../services/productService";
import { addCart } from "../../services/cartService";
import { message } from "antd";
import RelatedProduct from "./home/RelatedProduct";
import { createOrUpdateHistoryView } from "../../services/historyService";

const FIXED_SIZES = ["S", "M", "L", "XL", "XXL"];

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: products } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const { productInfor } = useSelector((state) => state.product);
  // console.log(productInfor);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const categoryId = productInfor?.categoryId;

  // Kiểm tra size khả dụng dựa trên màu sắc đã chọn
  const isSizeAvailableForColor = (sizeName) => {
    return productInfor?.productDetailAllResponse.some(
      (item) =>
        item.productDetail.color.id === selectedColor &&
        item.productDetail.size.name === sizeName
    );
  };

  // Lọc chi tiết sản phẩm theo màu sắc và kích thước
  const filterProductDetail = productInfor?.productDetailAllResponse.find(
    (item) =>
      item.productDetail.color.id === selectedColor &&
      item.productDetail.size.id === selectedSize
  );

  // console.log(filterProductDetail);

  const addOrUpdateHistoryView = () => {
    dispatch(createOrUpdateHistoryView(id));
  };

  // Lấy dữ liệu sản phẩm
  useEffect(() => {
    const loadData = () => {
      dispatch(findProductById(id));
      setLoading(false);
    };
    loadData();
    addOrUpdateHistoryView();
  }, [id, dispatch]);

  useEffect(() => {
    if (categoryId) {
      dispatch(topNewestProduct(categoryId));
    }
  }, [categoryId]);

  // Cập nhật state khi productInfor thay đổi
  useEffect(() => {
    if (productInfor) {
      // setSelectedImage(productInfor?.images[0]);
      setSelectedImage(null);
      setSelectedColor(productInfor?.colorSet[0]?.id);
      setSelectedSize(null); // Đặt size mặc định là null để chờ chọn
    }
  }, [productInfor]);

  // Cập nhật size khi màu thay đổi
  useEffect(() => {
    if (selectedColor) {
      const firstAvailableSize = FIXED_SIZES.find((sizeName) =>
        isSizeAvailableForColor(sizeName)
      );

      if (firstAvailableSize) {
        const sizeData = productInfor?.sizeSet.find(
          (size) => size.name === firstAvailableSize
        );
        setSelectedSize(sizeData?.id);
      } else {
        setSelectedSize(null);
      }
    }
  }, [selectedColor, productInfor]);

  useEffect(() => {
    if (filterProductDetail) {
      setSelectedImage(filterProductDetail.images[0]?.image);
    } else {
      setSelectedImage(null);
    }
  }, [filterProductDetail]);

  const handleQuantityChange = (value) => {
    if (value >= 1 && value <= 100) {
      setQuantity(value);
    }
  };

  const handleAddCart = async (id) => {
    // const cookies = JSON.parse(Cookies.get("objectCookies") || null);
    // console.log(cookies);
    // if (!cookies) {
    //   navigate("/signin");
    //   message.warning("You need to sign in first");
    //   return;
    // }
    try {
      const cartRequest = {
        quantity: quantity,
        productDetailId: id,
      };

      await dispatch(addCart(cartRequest)).unwrap();
      message.success("Add cart successfully!!");
    } catch (error) {
      // message.error(error);
      console.log("ádasd");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <p>Breadcrumb</p>

      <section className="grid grid-cols-2 gap-5 px-[100px] mb-7">
        {/* List images for each productDetail */}
        <div className="flex gap-2">
          <div className="space-y-4">
            {filterProductDetail?.images.map((img, index) => (
              <img
                key={index}
                src={img.image}
                width={100}
                onClick={() => setSelectedImage(img.image)}
                className={`w-[50px] h-[50px] cursor-pointer ${
                  img.image === selectedImage ? "border-2 border-black" : ""
                }`}
              />
            ))}
          </div>
          {/* The first image show here */}
          <div>
            <img
              src={selectedImage}
              className=" h-[calc(100vh-56px)] w-full object-cover"
            />
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div>
          <h2 className="text-2xl font-bold">{productInfor?.productName}</h2>
          {filterProductDetail && (
            <>
              <h1>Kind: {filterProductDetail.productDetail.name}</h1>
              <p className="text-red-600 font-bold text-[20px]">
                {filterProductDetail.productDetail.price} vnđ
              </p>
              <p>Stock: {filterProductDetail.productDetail.stockQuantity}</p>
            </>
          )}

          {/* List color */}
          <div className="mt-4">
            <h4 className="font-medium">Color:</h4>
            <div className="flex gap-2 mt-2">
              {productInfor?.colorSet.map((color) => (
                <button
                  key={color.id}
                  style={{
                    backgroundColor: color.name,
                  }}
                  className={`w-8 h-8 rounded-full ${
                    color.id === selectedColor
                      ? "border-[5px] border-purple-600"
                      : ""
                  }`}
                  onClick={() => setSelectedColor(color.id)}
                ></button>
              ))}
            </div>
          </div>

          {/* List size */}
          <div className="mt-4">
            <h4 className="text-lg font-medium">Size:</h4>
            <div className="flex gap-2 mt-2">
              {FIXED_SIZES.map((sizeName) => {
                const sizeData = productInfor?.sizeSet.find(
                  (size) => size.name === sizeName
                ); // return class size
                const isAvailable = isSizeAvailableForColor(sizeName);

                return (
                  <button
                    key={sizeName}
                    className={`px-3 py-1 border rounded ${
                      isAvailable
                        ? sizeData?.id === selectedSize
                          ? "border-black"
                          : ""
                        : "border-gray-200 bg-gray-100 cursor-not-allowed opacity-50"
                    }`}
                    onClick={() => isAvailable && setSelectedSize(sizeData?.id)}
                    disabled={!isAvailable}
                  >
                    {sizeName}
                  </button>
                );
              })}
            </div>
            {/* {!selectedSize && (
            <p className="text-red-500 mt-2">
              No available sizes for this color
            </p>
          )} */}
          </div>

          {/* Quantity cart */}
          <div className="mt-4">
            <h4 className="text-lg font-medium">Quantity:</h4>
            <div className="flex gap-2 mt-2">
              <button
                className={`px-2 py-1 border border-gray-300 ${
                  quantity === 1 ? "bg-gray-400 cursor-not-allowed" : ""
                }`}
                onClick={() => handleQuantityChange(quantity - 1)}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
                className=" w-16 text-center border border-gray-300"
              />
              <button
                className="px-2 py-1 border border-gray-300"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Buy button */}
          <div className="mt-4 space-y-2">
            <button
              onClick={() =>
                handleAddCart(filterProductDetail.productDetail.id)
              }
              className="w-full bg-orange-500 text-white py-2 cursor-pointer"
            >
              Thêm vào giỏ
            </button>
            <button className="w-full bg-orange-500 text-white py-2 cursor-pointer">
              Mua ngay
            </button>
          </div>
        </div>
      </section>

      <RelatedProduct></RelatedProduct>
    </>
  );
}
