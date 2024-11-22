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
import Choices from "../../../components/choices";
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
    <div className="bg-red-400 flex justify-between items-center ">
      <div className="flex items-center">
        {/* LOGO */}
        <div className="mr-4 p-[10px]">
          <Link to="/">
            <img
              className="w-[100px]"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"
              alt=""
            />
          </Link>
        </div>
        {/* NAV HEADER */}
        <div className="flex gap-3">
          {NAV.map((item, index) => (
            <NavLink
              key={index}
              className={"hover:text-red-500 font-bold text-[20px] p-[10px]"}
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
