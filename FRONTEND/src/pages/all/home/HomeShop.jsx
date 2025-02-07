import React from "react";

import ListCategory from "./ListCategory";
import History from "../../user/history/History";
import Cookies from "js-cookie";

export default function HomeShop() {
  // Kiểm tra trạng thái đăng nhập
  const isAuthenticated = () => {
    const cookies = JSON.parse(Cookies.get("objectCookies") || null);
    return cookies;
  };

  return (
    <main className="p-6">
      <ListCategory />
      {isAuthenticated() && <History />}
    </main>
  );
}
