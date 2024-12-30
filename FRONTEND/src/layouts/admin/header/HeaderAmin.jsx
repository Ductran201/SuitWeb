import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Header } from "antd/es/layout/layout";
import { MoonFilled, SunFilled, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout } from "antd";
import NotificationsIcon from "@mui/icons-material/Notifications";
export default function HeaderAdmin({
  toggleDarkMode,
  isDarkMode,
  onToggleMenu,
  isCollapsed,
}) {
  const items = [
    {
      key: "1",
      label: (
        <a
        // target="_blank"
        // rel="noopener noreferrer"
        // href=""
        // onClick={handleLogout}
        >
          Đăng xuất
        </a>
      ),
    },
  ];
  return (
    <>
      <Header className="bg-white">
        <div className="flex justify-between items-center">
          <Button
            type="text"
            icon={isCollapsed ? <MenuIcon /> : <MenuIcon />}
            onClick={onToggleMenu}
          />

          <div className="space-x-4">
            <span onClick={toggleDarkMode}>
              {isDarkMode ? <MoonFilled /> : <SunFilled />}
            </span>
            <NotificationsIcon />
            <Dropdown menu={{ items }} placement="bottomLeft" arrow>
              <Avatar size={40} icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </div>
      </Header>
    </>
  );
}
