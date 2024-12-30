// import React, { useState } from "react";
// // import "./index.scss";
// import HeaderAdmin from "./header/HeaderAmin";
// import NavAdmin from "./nav/NavAdmin";
// import { Navigate, Outlet, useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { Layout } from "antd";
// export default function AdminLayout() {
//   const { Header, Sider, Content } = Layout;

//   // Set collapse side bar admin
//   const [isCollapsed, setCollapsed] = useState(false);

//   const toggleCollapsed = () => {
//     setCollapsed(!isCollapsed);
//   };

//   // Set dark mode get from localStorge
//   const [isDarkMode, setIsDarkMode] = useState(() => {
//     const modeLocal = JSON.parse(localStorage.getItem("mode")) || "light";
//     return modeLocal === "light" ? false : true;
//   });

//   const toggleDarkMode = () => {
//     const updateMode = !isDarkMode;
//     setIsDarkMode(updateMode);
//     localStorage.setItem("mode", JSON.stringify(updateMode));
//     document.documentElement.classList.toggle("dark", updateMode);
//   };

//   const cookies = JSON.parse(Cookies.get("objectCookies") || null);
//   // console.log(cookies);

//   return (
//     // <Layout className={`h-screen ${isDarkMode ? "dark" : ""} `}>
//     <div
//       // className={`h-screen flex bg-lightBg text-lightText dark:bg-darkBg dark:text-darkText`}
//       className={`h-screen flex `}
//     >
//       <Sider width={250} collapsed={isCollapsed} collapsedWidth={80}>
//         {/* <aside className="w-64 bg-darkBg text-darkText"> */}
//         <NavAdmin
//           isDarkMode={isDarkMode}
//           isCollapsed={isCollapsed}
//           onToggleMenu={toggleCollapsed}
//         />
//       </Sider>
//       <main className="p-4 flex-1 bg-lightBg text-lightText dark:bg-darkBg dark:text-darkText">
//         <HeaderAdmin
//           toggleDarkMode={toggleDarkMode}
//           isDarkMode={isDarkMode}
//           onToggleMenu={toggleCollapsed}
//         />
//         <div className="p-4">
//           {/* Check if there is no cookies =>
//       signIn / if has => check role to admin page*/}
//           {!cookies ? (
//             <Navigate to={"/signin"} />
//           ) : cookies?.data.roles.some((role) => role === "ROLE_ADMIN") ? (
//             <Outlet />
//           ) : (
//             <Navigate to={"/unauthorized"} />
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

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
    <Layout className={`h-screen ${isDarkMode ? "dark" : ""} `}>
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
