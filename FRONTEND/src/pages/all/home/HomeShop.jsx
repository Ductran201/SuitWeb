import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productDetailPagination } from "../../../services/productDetailService";
import ListCategory from "./ListCategory";
import History from "../../user/history/History";
import Cookies from "js-cookie";

export default function HomeShop() {
  const dispatch = useDispatch();
  // const { data, error } = useSelector((state) => state.product);
  // const [page, setPage] = useState(0);
  // const [search, setSearch] = useState("");

  // const loadProductData = () => {
  //   dispatch(productDetailPagination({ page, search }));
  // };
  // Kiểm tra trạng thái đăng nhập
  const isAuthenticated = () => {
    const cookies = JSON.parse(Cookies.get("objectCookies") || null);
    return cookies;
    // return !!cookies?.data?.accessToken; // Có token nghĩa là đã đăng nhập
  };
  return (
    <main className="p-6">
      <ListCategory />
      {isAuthenticated() && <History />}
    </main>
  );
}
