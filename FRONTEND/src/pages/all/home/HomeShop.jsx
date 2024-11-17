import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productDetailPagination } from "../../../services/productDetailService";
import ListCategory from "./ListCategory";

export default function HomeShop() {
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.product);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  const loadProductData = () => {
    dispatch(productDetailPagination({ page, search }));
  };

  return (
    <main className="p-6">
      <ListCategory />
    </main>
  );
}
