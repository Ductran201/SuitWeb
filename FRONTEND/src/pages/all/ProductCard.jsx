import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function ProductCard({
  productId,
  productName,
  currentImage,
  currentPrice,
  wishList,
  onToggleWishList,
  colorSet,
  selectedColor,
  onHoverColor,
}) {
  return (
    <>
      <div className="flex flex-col items-center gap-3 p-4 bg-white shadow-md rounded-lg">
        {/* Discount */}
        {/* <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-sm rounded">
              {item?.discount}
            </div> */}

        <Link to={`/product/${productId}`}>
          {/* Product Image */}
          <div className="aspect-w-1 aspect-h-1s">
            <img
              src={currentImage}
              alt="Hovered"
              className="h-48 w-full object-cover rounded-md"
            />
          </div>

          {/* Product Info */}
          <h3 className="mt-4 text-lg font-medium">{productName}</h3>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-red-500 font-semibold">{currentPrice}</span>
            {/* <span className="line-through text-gray-500 text-sm">
                {item?.oldPrice}
              </span> */}
          </div>
        </Link>
        <FavoriteBorderIcon
          onClick={onToggleWishList}
          className={`cursor-pointer ${wishList ? "text-red-600" : ""}`}
          fontSize="large"
        />

        {/* Colors */}
        <div className="flex items-center space-x-2 mt-3">
          {colorSet?.map((color) => (
            <div
              key={color.id}
              className={`h-6 w-6 rounded-full border-2 cursor-pointer ${
                selectedColor === color.id ? "border-black" : "border-gray-300"
              }`}
              style={{
                backgroundColor: color.name.toLowerCase(), // Màu sắc dựa vào tên
              }}
              onMouseEnter={() => onHoverColor(color.id)}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}
