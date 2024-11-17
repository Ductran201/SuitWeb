import React, { useEffect } from "react";
import HeaderShop from "./headerShop/HeaderShop";
import FooterShop from "./footerShop/FooterShop";
import { Outlet, useLocation } from "react-router-dom";

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
    <>
      <HeaderShop />
      <Outlet />
      <FooterShop />
    </>
  );
}
