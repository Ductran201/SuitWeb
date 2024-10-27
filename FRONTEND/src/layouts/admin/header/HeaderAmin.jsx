import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

export default function HeaderAdmin() {
  return (
    <>
      <header className="flex justify-between p-5 h-[56px]">
        <MenuIcon></MenuIcon>
        <h1>Duc Tran</h1>
      </header>
    </>
  );
}
