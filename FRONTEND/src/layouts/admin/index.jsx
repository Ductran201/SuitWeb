import React from "react";
import HeaderAdmin from "./header/HeaderAmin";
import NavAdmin from "./nav/NavAdmin";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex h-[100vh]">
      <NavAdmin />
      <div className=" flex-1">
        <HeaderAdmin />
        <Outlet />
      </div>
    </div>
  );
}
