import React from "react";
import { useSelector } from "react-redux";

export default function AboutShop() {
  const { data: products, error: productError } = useSelector(
    (state) => state.product
  );
  console.log(products);
  return <div>AboutAll</div>;
}
