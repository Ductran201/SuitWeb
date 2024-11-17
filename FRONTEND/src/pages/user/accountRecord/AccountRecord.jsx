import React from "react";
import { Navigate } from "react-router-dom";

export default function AccountRecord() {
  const user = JSON.parse(localStorage.getItem("userInfor"));
  console.log(user);

  return (
    <>
      {user ? (
        <div>
          <h1>co </h1>
          <h1>co </h1>
          <h1>co </h1>
        </div>
      ) : (
        <Navigate to={"/signin"} />
      )}
    </>
  );
}
