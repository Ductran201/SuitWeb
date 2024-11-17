import React, { useEffect } from "react";
import HeaderAdmin from "./header/HeaderAmin";
import NavAdmin from "./nav/NavAdmin";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminLayout() {
  // const { isSignIn, data } = useSelector((state) => state.auth);

  // console.log(isSignIn);
  // console.log(data);
  const user = JSON.parse(localStorage.getItem("userInfor"));

  return (
    <div className="flex h-[100vh]">
      <NavAdmin />
      <div className=" flex-1">
        <HeaderAdmin />
        {/* Check if there is no user on localStorage => 
          signIn / if has => check role to admin page*/}
        {!user ? (
          <Navigate to={"/signin"} />
        ) : user?.roles.some((item) => item === "ROLE_ADMIN") ? (
          <Outlet />
        ) : (
          <Navigate to={"/unauthorized"} />
        )}
      </div>
    </div>
  );
}
