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
import useProductCard from "../../../components/useProductCard/useProductCard";

export default function ListCategory() {
  const dispatch = useDispatch();

  const { data: products, error: productError } = useSelector(
    (state) => state.product
  );

  const { data: categories, error: categoryError } = useSelector(
    (state) => state.category
  );

  const { selectedColor, handleHoverColor, getCurrentDetail } =
    useProductCard(products);

  const [selectCategory, setSelectCategory] = useState();

  const loadInitialData = () => {
    dispatch(categoryNoPagination());
  };

  useEffect(() => {
    loadInitialData();
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

  return (
    <div className="mb-10">
      <div className="text-[20px] mb-3 text-center font-[500]">
        Suggest products
      </div>

      <div className="flex justify-center gap-2">
        {categories?.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handlePreCategory(cat.id)}
            to="#"
            className={`min-w-[120px] rounded-full p-2 ${
              selectCategory == cat.id
                ? "bg-[#ffb400] font-[500]"
                : "opacity-80"
            } `}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* top newest products */}
      <div className="grid grid-cols-4 gap-5 mb-6">
        {products?.map((item, i) => {
          const currentDetail = getCurrentDetail(item, item.productName);
          const currentImage = currentDetail?.images?.[0]?.image || "";
          const currentPrice =
            currentDetail?.productDetail?.price || "Chưa có giá";

          return (
            <ProductCard
              // key={item.productId}
              key={i}
              productId={item.productId}
              productName={item.productName}
              currentImage={currentImage}
              currentPrice={currentPrice}
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
        <Link
          className="p-2 border inline-block border-black min-w-[250px] rounded-lg font-[500]"
          to={`/category/${selectCategory}`}
        >
          See more
        </Link>
      </div>
    </div>
  );
}
