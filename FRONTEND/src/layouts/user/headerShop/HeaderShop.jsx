import { Edit, ShoppingCart } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import IconUser from "./IconUser";

const NAV = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "News",
    path: "/news",
  },
  {
    name: "Contact",
    path: "/contact",
  },
  {
    name: "Branch",
    path: "/branch",
  },
];

export default function HeaderShop() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenCart = () => {
    console.log("open cart");
    navigate("/cart");
  };

  return (
    <div className="bg-white border-b-2 border-[#eceff4] flex justify-between items-center p-2">
      <div className="flex items-center">
        {/* LOGO */}
        <div className="mr-4 p-[10px]">
          <Link to="/">
            <img
              className="w-[100px] h-[56px]"
              src="https://bizweb.dktcdn.net/100/345/548/themes/706243/assets/logo_share.png?1733121221120"
              alt=""
            />
          </Link>
        </div>
        {/* NAV HEADER */}
        <div className="flex gap-3">
          {NAV.map((item, index) => (
            <NavLink
              key={index}
              className={"hover:text-[#ff5b6a] font-bold text-[20px] p-[10px]"}
              to={item.path}
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* RIGHT */}
      </div>

      <div className="flex justify-center items-center gap-3">
        <TextField label="Search" size="small" />
        <div>
          <IconUser />
        </div>
        <div>
          <ShoppingCart onClick={handleOpenCart} />
        </div>
      </div>
    </div>
  );
}
