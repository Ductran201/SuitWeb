import React, { useEffect } from "react";
import ProductCard from "../../all/ProductCard";
import useProductCard from "../../../components/useProductCard/useProductCard";
import { useDispatch, useSelector } from "react-redux";
import { findAllHistoryView } from "../../../services/historyService";

export default function History() {
  const dispatch = useDispatch();
  const { data: products } = useSelector((state) => state.historyView);
  const { selectedColor, handleHoverColor, getCurrentDetail } =
    useProductCard(products);
  console.log("123", products);

  useEffect(() => {
    dispatch(findAllHistoryView());
  }, []);
  return (
    <>
      <h2 className="font-bold text-center mb-4">History view product</h2>
      <div className="grid grid-cols-4 gap-5">
        {products?.map((item) => {
          // console.log(item.productResponse);
          const currentDetail = getCurrentDetail(item, item.productName);
          // console.log(currentDetail);
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
              colorSet={item.colorSet}
              selectedColor={selectedColor[item.productName]}
              onHoverColor={(colorId) =>
                handleHoverColor(item.productName, colorId)
              }
            />
          );
        })}
      </div>
    </>
  );
}
