import { Avatar } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Choices from "../../../components/choices";
// import { Cookies } from "react-cookie";
import Cookies from "js-cookie";
import { signOut } from "../../../services/userService";

export default function AccountUser() {
  const cookies = JSON.parse(Cookies.get("objectCookies") || null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = () => {
    console.log("123");
    navigate("/signin");
  };

  const handleSignUp = () => {
    console.log("456");
    navigate("/signup");
  };

  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/");
  };

  // const listOtionAvatar = !new Cookies().get("accessToken")
  const listOtionAvatar = !cookies
    ? [
        {
          name: "Sign in",
          // icon: <Edit />,
          function: () => handleSignIn(),
        },

        // {
        //   name: status ? "Block" : "Unblock",
        //   icon: status ? <Lock /> : <LockOpen />,
        //   function: () => handleOpenDialog(id, "status", status),
        // },
        {
          name: "Sign up",
          // icon: <Delete />,
          function: () => handleSignUp(),
        },
      ]
    : [
        {
          // name: `${new Cookies().get("accessToken").data.email}`,
          name: `${cookies?.data.email}`,
          function: () => navigate("/account"),
        },

        {
          name: "Sign out",
          function: () => handleSignOut(),
        },
      ];
  return (
    <>
      <Choices icon={<Avatar />} listOptions={listOtionAvatar} />
    </>
  );
}
