import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  AppstoreOutlined,
  SolutionOutlined,
  UserOutlined,
  ProductFilled,
  StockOutlined,
  AuditOutlined,
  BgColorsOutlined,
  GatewayOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";

export default function NavAdmin() {
  const location = useLocation(); // Hook để lấy thông tin đường dẫn hiện tại
  const currentPath = location.pathname; // Lấy đường dẫn hiện tại

  // console.log(currentPath);
  const items = [
    {
      key: "1",
      icon: <AppstoreOutlined />,
      label: "Dash Board",
      link: "/admin",
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "Account Management",
      link: "/admin/user",
    },
    {
      key: "3",
      icon: <AuditOutlined />,
      label: "Category Management",
      link: "/admin/category",
    },
    {
      key: "4",
      icon: <ProductFilled />,
      label: "Product Management",
      link: "/admin/product",
    },
    {
      key: "5",
      icon: <SolutionOutlined />,
      label: "Order Management",
      link: "/admin/order",
    },
    {
      key: "6",
      icon: <BgColorsOutlined />,
      label: "Color Management",
      link: "/admin/color",
    },
    {
      key: "7",
      icon: <GatewayOutlined />,
      label: "Size Management",
      link: "/admin/size",
    },
    {
      key: "8",
      icon: <StockOutlined />,
      label: "Voucher",
      link: "/admin/voucher",
    },
    {
      key: "9",
      icon: <StockOutlined />,
      label: "Comment",
      link: "/admin/comment",
    },
    {
      key: "10",
      icon: <StockOutlined />,
      label: "Shop",
      link: "/",
    },
  ];

  return (
    <>
      <div className="text-center my-4">
        <Link to="/admin" className="text-white">
          ADMIN
        </Link>
      </div>
      <hr></hr>
      <div />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[currentPath]}
        items={items.map((item) => ({
          key: item.link,
          icon: item.icon,
          label: <Link to={item.link}>{item.label}</Link>,
        }))}
      ></Menu>
    </>
  );
}
