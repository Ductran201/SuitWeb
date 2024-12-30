import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import {
  categoryNoPagination,
  findAllProductByCategory,
} from "../../../services/categoryService";

import { Button } from "@mui/material";
import { topNewestProduct } from "../../../services/productService";
import { findAllWishList, toggleWishList } from "../../../services/wishList";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Cookies from "js-cookie";
import ProductCard from "../ProductCard";

export default function ListCategory() {
  // Kiểm tra trạng thái đăng nhập
  const isAuthenticated = () => {
    const cookies = JSON.parse(Cookies.get("objectCookies") || null);
    return cookies;
    // return !!cookies?.data?.accessToken; // Có token nghĩa là đã đăng nhập
  };
  const dispatch = useDispatch();

  const { data: products, error: productError } = useSelector(
    (state) => state.product
  );

  const { data: categories, error: categoryError } = useSelector(
    (state) => state.category
  );

  const { data: wishList, error: wishListError } = useSelector(
    (state) => state.wishList
  );

  const [selectCategory, setSelectCategory] = useState();
  const [selectedColor, setSelectedColor] = useState({}); // Lưu trạng thái cuối cùng của màu được chọn

  // console.log(products);

  // Khi bắt đầu load sản phẩm, mặc định chọn màu đầu tiên của mỗi sản phẩm
  useEffect(() => {
    if (products) {
      const initialColors = {};
      products.forEach((product) => {
        const firstColor = product.colorSet?.[0];
        if (firstColor) {
          initialColors[product.productName] = firstColor.id;
        }
      });
      setSelectedColor(initialColors);
    }
  }, [products]);

  // Xử lý khi hover vào màu
  const handleHoverColor = (productName, colorId) => {
    setSelectedColor((prev) => ({
      ...prev,
      [productName]: colorId,
    }));
  };
  const getCurrentDetail = (product, productName) => {
    const colorId = selectedColor[productName];
    return product?.productDetailAllResponse?.find(
      (detail) => detail.productDetail.color.id === colorId
    );
  };

  const loadInitialData = () => {
    dispatch(categoryNoPagination());
  };

  const loadWishList = () => {
    dispatch(findAllWishList());
  };

  useEffect(() => {
    loadInitialData();
    if (isAuthenticated()) {
      loadWishList();
    }
  }, []);

  useEffect(() => {
    if (categories?.length && selectCategory == null) {
      const firstCategoryId = categories[0].id;
      setSelectCategory(firstCategoryId);
      dispatch(topNewestProduct(firstCategoryId));
    }
  }, [categories, selectCategory]);

  const handlePreCategory = (id) => {
    setSelectCategory(id);
    dispatch(topNewestProduct(id));
  };

  const handleToggleWishList = (productId) => {
    dispatch(toggleWishList(productId))
      .then(() => loadWishList())
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="mb-3 text-center font-bold">Suggest products</div>

      <div className="flex justify-center gap-10 bg-slate-500 ">
        {categories?.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handlePreCategory(cat.id)}
            to="#"
            className={`hover:bg-red-400 p-4 ${
              selectCategory == cat.id ? "bg-green-400" : ""
            } `}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* top newest products */}
      <div className="grid grid-cols-4 gap-5">
        {products?.map((item) => {
          const currentDetail = getCurrentDetail(item, item.productName);
          const currentImage = currentDetail?.images?.[0]?.image || "";
          const currentPrice =
            currentDetail?.productDetail?.price || "Chưa có giá";

          return (
            <ProductCard
              key={item.productId}
              productId={item.productId}
              productName={item.productName}
              currentImage={currentImage}
              currentPrice={currentPrice}
              wishList={wishList?.some((wish) => wish.id === item.productId)}
              onToggleWishList={() => handleToggleWishList(item.productId)}
              colorSet={item.colorSet}
              selectedColor={selectedColor[item.productName]}
              onHoverColor={(colorId) =>
                handleHoverColor(item.productName, colorId)
              }
            />
          );
        })}
      </div>

      <div className="text-center">
        <Link to={`/category/${selectCategory}`}>See more</Link>
      </div>
    </>
  );
}
