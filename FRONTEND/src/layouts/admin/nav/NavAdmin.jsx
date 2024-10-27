import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function NavAdmin() {
  return (
    <menu className=" w-[200px]">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"
        alt=""
        className="p-4"
      />
      <div className="flex flex-col gap-2 p-3">
        <NavLink
          end
          to={"/admin"}
          className={"hover:text-yellow-500 px-1 py-4 block"}
        >
          Dash Board
        </NavLink>
        <NavLink
          to={"/admin/user"}
          className={"hover:text-yellow-500 px-1 py-4 block"}
        >
          Account Management
        </NavLink>
        <NavLink
          to={"/admin/category"}
          className={"hover:text-yellow-500 px-1 py-4 block"}
        >
          Category Management
        </NavLink>
        <NavLink
          to={"/admin/product"}
          className={"hover:text-yellow-500 px-1 py-4 block"}
        >
          Product Management
        </NavLink>
        <NavLink
          to={"/admin/color"}
          className={"hover:text-yellow-500 px-1 py-4 block"}
        >
          Color Management
        </NavLink>
        <NavLink
          to={"/admin/size"}
          className={"hover:text-yellow-500 px-1 py-4 block"}
        >
          Size Management
        </NavLink>

        <NavLink to={"/"} className={"hover:text-yellow-500 px-1 py-4 block"}>
          Home Shop
        </NavLink>
      </div>
    </menu>
  );
}
