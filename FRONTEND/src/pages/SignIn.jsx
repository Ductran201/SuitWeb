import { Button, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../services/userService";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    clearErrors,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    navigate("/");
  };

  const onSubmit = async (dataForm) => {
    try {
      const res = await dispatch(signIn(dataForm)).unwrap();
      if (res) {
        console.log(res);
        const userInfor = {
          address: res.address,
          avatar: res.avatar,
          // createdAt: res.createdAt,
          email: res.email,
          fullName: res.fullName,
          phone: res.phone,
          roles: res.roles,
          status: res.status,
        };
        console.log(userInfor);

        localStorage.setItem("userInfor", JSON.stringify(userInfor));

        if (res.roles.some((item) => item === "ROLE_ADMIN")) {
          navigate("/admin");
        } else {
          if (currentPath) {
            navigate(currentPath);
          } else {
            navigate("/");
          }
        }
      }
    } catch (error) {
      setError("email", {
        type: "manual",
        message: error,
      });
    }
  };

  const currentPath = JSON.parse(localStorage.getItem("currentPath"));

  return (
    <div className="h-[100vh] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-300 min-w-[400px] p-6 flex flex-col gap-6"
      >
        <h1>Sign In</h1>

        <TextField
          fullWidth
          size="small"
          label="Email"
          {...register("email", {
            required: "Must not be blank",
            validate: (value) =>
              value.trim() !== "" ? true : "Must not be blank",
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          fullWidth
          type="password"
          size="small"
          label="Password"
          {...register("password", {
            required: "Must not be blank",
            validate: (value) =>
              value.trim() !== "" ? true : "Must not be blank",
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button type="submit" variant="contained">
          Sign in
        </Button>
        <p className="text-right">
          You do not have account{" "}
          <Link className="text-blue-400" to={"/signup"}>
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
