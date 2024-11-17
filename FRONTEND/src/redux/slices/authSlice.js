import { createSlice } from "@reduxjs/toolkit";
import { signIn } from "../../services/userService";
import { FAILED, PENDING, SUCCESS } from "../constants";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    data: null,
    error: null,
    isSignIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // builder
    //   .addCase(signIn.pending, (state) => {
    //     state.status = PENDING;
    //   })
    //   .addCase(signIn.fulfilled, (state, action) => {
    //     state.status = SUCCESS;
    //     state.isSignIn = true;
    //     console.log("ád");
    //     console.log(action);
    //     state.data = action;
    //   })
    //   .addCase(signIn.rejected, (state, action) => {
    //     state.status = FAILED;
    //     state.isSignIn = false;
    //     state.error = action.error.message;
    //   });
  },
});

export default authSlice.reducer;
