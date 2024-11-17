import { Button, TextField } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../services/userService";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const inputRefFocus = useRef();

  useEffect(() => {
    // if (inputRefFocus) {
    //   inputRefFocus.current.focus();
    // }
  }, []);
  const {
    register,
    clearErrors,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (dataForm) => {
    try {
      const res = await dispatch(signUp(dataForm)).unwrap();
      // console.log(res);
      if (res.status == 201) {
        navigate("/signin");
      }
      // Navigate to sign in
    } catch (error) {
      setError("email", {
        type: "manual",
        message: error,
      });
    }
  };

  return (
    <div className="h-[100vh] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-300 min-w-[400px] p-6 flex flex-col gap-6"
      >
        <h1>Sign Up</h1>
        <TextField
          fullWidth
          size="small"
          label="Full Name"
          {...register("fullName", {
            required: "Must not be blank",
            validate: (value) =>
              value.trim() !== "" ? true : "Must not be blank",
          })}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
        />
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
          Sign up
        </Button>
        <p className="text-right">
          You have account{" "}
          <Link className="text-blue-400" to={"/signin"}>
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
