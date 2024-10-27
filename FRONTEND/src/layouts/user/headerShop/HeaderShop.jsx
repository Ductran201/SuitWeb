import { Edit } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

export default function HeaderShop() {
  return (
    <div className="bg-red-400 flex justify-between items-center ">
      <div className="flex items-center">
        <div className="mr-4 p-[10px]">logo</div>
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
        icon avatar icon cart
      </div>
    </div>
  );
}
