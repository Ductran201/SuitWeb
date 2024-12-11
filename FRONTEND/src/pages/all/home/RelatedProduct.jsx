import React, { useEffect } from "react";
import useProductCard from "../../../components/useProductCard/useProductCard";
import ProductCard from "../ProductCard";
import { useSelector } from "react-redux";

export default function RelatedProduct() {
  const { data: products } = useSelector((state) => state.product);

  const { selectedColor, handleHoverColor, getCurrentDetail } =
    useProductCard(products);

  return (
    <>
      {/* <div className="p-5"> */}
      <h2 className="text-2xl font-semibold mb-5">Related products</h2>
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
              colorSet={item.colorSet}
              selectedColor={selectedColor[item.productName]}
              onHoverColor={(colorId) =>
                handleHoverColor(item.productName, colorId)
              }
            />
          );
        })}
      </div>
      {/* </div> */}
    </>
  );
}
