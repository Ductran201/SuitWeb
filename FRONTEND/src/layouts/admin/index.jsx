import React, { useState } from "react";
// import "./index1.scss";
import HeaderAdmin from "./header/HeaderAmin";
import NavAdmin from "./nav/NavAdmin";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Layout, Menu } from "antd";
export default function AdminLayout() {
  const { Header, Sider, Content } = Layout;
  // Set collapse side bar admin
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Set dark mode get from localStorge
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const modeLocal = JSON.parse(localStorage.getItem("mode")) || "light";
    return modeLocal === "light" ? false : true;
  });

  const toggleDarkMode = () => {
    const updateMode = !isDarkMode;
    setIsDarkMode(updateMode);
    localStorage.setItem("mode", JSON.stringify(updateMode));
  };

  const cookies = JSON.parse(Cookies.get("objectCookies") || null);

  return (
    <Layout className={`min-h-screen`}>
      <Sider width={250} collapsed={collapsed} collapsedWidth={80}>
        <NavAdmin />
      </Sider>
      <Layout>
        <HeaderAdmin
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
          onToggleMenu={toggleCollapsed}
        />
        <Content>
          {/* Check if there is no cookies =>
      signIn / if has => check role to admin page*/}
          {!cookies ? (
            <Navigate to={"/signin"} />
          ) : cookies?.data.roles.some((role) => role === "ROLE_ADMIN") ? (
            <Outlet />
          ) : (
            <Navigate to={"/unauthorized"} />
          )}
        </Content>
      </Layout>
    </Layout>
  );
}
