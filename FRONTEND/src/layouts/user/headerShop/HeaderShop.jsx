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
import AccountUser from "./AccountUser";

export default function HeaderShop() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenCart = () => {
    console.log("open cart");
  };

  return (
    <div className="bg-red-400 flex justify-between items-center ">
      <div className="flex items-center">
        <div className="mr-4 p-[10px]">
          <Link to="/">
            <img
              className="w-[100px]"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"
              alt=""
            />
          </Link>
        </div>
        <div className="flex gap-3">
          <NavLink
            className={"hover:text-red-500 font-bold text-[20px] p-[10px]"}
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            className={"hover:text-red-500 font-bold text-[20px] p-[10px]"}
            to={"about"}
          >
            About
          </NavLink>
          <NavLink
            className={"hover:text-red-500 font-bold text-[20px] p-[10px]"}
            to={"news"}
          >
            News
          </NavLink>
          <NavLink
            className={"hover:text-red-500 font-bold text-[20px] p-[10px]"}
            to={"contact"}
          >
            Contact
          </NavLink>
          <NavLink
            className={"hover:text-red-500 font-bold text-[20px] p-[10px]"}
            to={"branch"}
          >
            Branch
          </NavLink>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3">
        {/* right */}
        <TextField label="Search" size="small" />
        <div>
          <AccountUser />
        </div>
        <div>
          <ShoppingCart onClick={handleOpenCart} />
        </div>
      </div>
    </div>
  );
}
