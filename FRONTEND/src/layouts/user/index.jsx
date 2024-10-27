import React from "react";
import HeaderShop from "./headerShop/HeaderShop";
import FooterShop from "./footerShop/FooterShop";
import { Outlet } from "react-router-dom";
import NavShop from "./nav/NavShop";

export default function ShopLayout() {
  return (
    <>
      <HeaderShop />
      <NavShop />
      <Outlet />
      <FooterShop />
    </>
  );
}
