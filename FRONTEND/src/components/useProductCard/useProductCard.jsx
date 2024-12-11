import React, { useEffect, useState } from "react";

export default function useProductCard(products) {
  const [selectedColor, setSelectedColor] = useState({}); // Lưu trạng thái cuối cùng của màu được chọn

  // console.log("mang products", products); // productResponse
  useEffect(() => {
    if (products) {
      const initialColors = {};
      products.forEach((product) => {
        const firstColor = product.colorSet?.[0];
        if (firstColor) {
          initialColors[product.productName] = firstColor.id;
        }
      });
      setSelectedColor(initialColors); // {name1: 1 , name2: 2}
    }
  }, [products]);

  // console.log("once", selectedColor);

  // Xử lý khi hover vào màu
  const handleHoverColor = (productName, colorId) => {
    setSelectedColor((prev) => ({
      ...prev,
      [productName]: colorId,
    }));

    // console.log("just hover", selectedColor);
  };

  // console.log("second", selectedColor);

  const getCurrentDetail = (product, productName) => {
    const colorId = selectedColor[productName];
    return product?.productDetailAllResponse?.find(
      (detail) => detail.productDetail.color.id === colorId
    );
  };
  return {
    selectedColor,
    handleHoverColor,
    getCurrentDetail,
  };
}
