import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Cookies from "js-cookie";
import { findAllWishList, toggleWishList } from "../../services/wishList";
import { convertLocalDateTime } from "../../services/common";

export default function ProductCard({
  productId,
  productName,
  currentImage,
  currentPrice,
  colorSet,
  selectedColor,
  onHoverColor,
  viewTime,
}) {
  // Kiểm tra trạng thái đăng nhập
  const isAuthenticated = () => {
    const cookies = JSON.parse(Cookies.get("objectCookies") || null);
    return cookies;
    // return !!cookies?.data?.accessToken; // Có token nghĩa là đã đăng nhập
  };
  const dispatch = useDispatch();
  const { data: wishList, error: wishListError } = useSelector(
    (state) => state.wishList
  );
  const loadWishList = () => {
    dispatch(findAllWishList());
  };

  const isWishList = wishList?.some((wish) => wish.id === productId);

  useEffect(() => {
    if (isAuthenticated()) {
      loadWishList();
    }
  }, []);

  const handleToggleWishList = (productId) => {
    dispatch(toggleWishList(productId))
      .then(() => loadWishList())
      .catch((error) => console.log(error));
  };
  return (
    <>
      <div className="relative flex flex-col gap-3 p-4 bg-white shadow-md rounded-lg">
        {/* Discount */}
        {/* <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-sm rounded">
              {item?.discount}
            </div> */}

        <Link to={`/product/${productId}`} className="w-full">
          {/* Product Image */}
          <div className="w-full h-[400px]">
            <img
              src={currentImage}
              alt="Hovered"
              className="h-full w-full object-cover rounded-md"
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
          onClick={() => handleToggleWishList(productId)}
          className={`absolute right-3 bottom-[15%] cursor-pointer ${
            isWishList ? "text-red-600" : ""
          }`}
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
                backgroundColor: color.name.toLowerCase(),
              }}
              onMouseEnter={() => onHoverColor(color.id)}
            ></div>
          ))}
        </div>
        {viewTime && <p>View time: {convertLocalDateTime(viewTime)}</p>}
      </div>
    </>
  );
}
