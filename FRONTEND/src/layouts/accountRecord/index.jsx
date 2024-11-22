import { Button, InputBase, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SideMenu from "./sideMenu/sideMenu";
import { getUserInfor } from "../../services/userService";
import Cookies from "js-cookie";
const AccountRecord = () => {
  const cookies = JSON.parse(Cookies.get("objectCookies") || null);

  const dispatch = useDispatch();

  const loadData = () => {
    dispatch(getUserInfor());
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {!cookies ? (
        <Navigate to={"/signin"} />
      ) : (
        <div className="max-w-4xl mx-auto shadow-2xl rounded-3xl mt-6 flex">
          <SideMenu />

          <Outlet />
        </div>
      )}
    </>
  );
};

export default AccountRecord;
