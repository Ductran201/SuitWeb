import React from "react";
import { NavLink } from "react-router-dom";
import { Image } from "antd";
import { useSelector } from "react-redux";

export default function SideMenu() {
  const { infor } = useSelector((state) => state.user);

  return (
    <>
      <div className="w-1/4 bg-red-400 rounded-tl-3xl rounded-bl-3xl">
        <div className="text-center p-4">
          {/* <div className="w-20 h-20 mx-auto bg-red-500 text-white text-3xl font-bold rounded-full flex items-center justify-center"> */}
          <Image
            width={150}
            src={infor?.avatar}
            className="rounded-full object-cover"
          />

          {/* </div> */}
          <h2 className="text-lg font-semibold mt-2">{infor?.fullName}</h2>
        </div>
        <nav className=" text-gray-700 text-sm flex flex-col gap-2">
          <NavLink
            to={"/account/infor"}
            className=" px-4 py-2 bg-red-100 font-semibold"
          >
            Account information
          </NavLink>
          <NavLink
            to={"/account/social"}
            className=" px-4 py-2 hover:bg-gray-100"
          >
            Tài khoản mạng xã hội
          </NavLink>
          <NavLink
            to={"/account/shipping-address"}
            className=" px-4 py-2 hover:bg-gray-100"
          >
            Shipping Address
          </NavLink>
          <NavLink
            to={"/account/history"}
            className=" px-4 py-2 hover:bg-gray-100"
          >
            Order history
          </NavLink>
          <NavLink
            to={"/account/coupons"}
            className=" px-4 py-2 hover:bg-gray-100"
          >
            My coupons
          </NavLink>
          <NavLink
            to={"/account/wishlist"}
            className=" px-4 py-2 hover:bg-gray-100"
          >
            My menu / wishlist
          </NavLink>
          <NavLink
            to={"/account/qwwqe"}
            className=" px-4 py-2 hover:bg-gray-100"
          >
            Ý kiến khách hàng
          </NavLink>
          <NavLink
            to={"/account/qwwqe"}
            className=" px-4 py-2 hover:bg-gray-100"
          >
            Support
          </NavLink>
          <NavLink
            to={"/account/qwwqe"}
            className=" px-4 py-2 hover:bg-gray-100"
          >
            Sign out
          </NavLink>
        </nav>
      </div>
    </>
  );
}
