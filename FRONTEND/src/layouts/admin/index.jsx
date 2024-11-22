import React, { useEffect } from "react";
import HeaderAdmin from "./header/HeaderAmin";
import NavAdmin from "./nav/NavAdmin";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
export default function AdminLayout() {
  // const { isSignIn, data } = useSelector((state) => state.auth);

  // console.log(isSignIn);
  // console.log(data);
  const cookies = JSON.parse(Cookies.get("objectCookies") || null);
  console.log(cookies);

  return (
    <div className="flex h-[100vh]">
      <NavAdmin />
      <div className=" flex-1">
        <HeaderAdmin />
        {/* Check if there is no cookies => 
          signIn / if has => check role to admin page*/}
        {!cookies ? (
          <Navigate to={"/signin"} />
        ) : cookies?.data.roles.some((item) => item === "ROLE_ADMIN") ? (
          <Outlet />
        ) : (
          <Navigate to={"/unauthorized"} />
        )}
      </div>
    </div>
  );
}
