import React, { useEffect, useState } from "react";
import HeaderShop from "./headerShop/HeaderShop";
import FooterShop from "./footerShop/FooterShop";
import { Outlet, useLocation } from "react-router-dom";
// import "../admin/index1.scss";

export default function ShopLayout() {
  const location = useLocation();

  useEffect(() => {
    const pathName = location.pathname;

    localStorage.setItem("currentPath", JSON.stringify(pathName));
  }, [location.pathname]);
  console.log("path", location.pathname);
  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }, [location.pathname]);
  return (
    <div className={`flex flex-col min-h-screen`}>
      <HeaderShop />
      <div className="flex-1">
        <Outlet />
      </div>
      <FooterShop />
    </div>
  );
}
