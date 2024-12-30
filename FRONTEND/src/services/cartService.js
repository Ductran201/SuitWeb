import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../api";
import { Navigate } from "react-router-dom";

// const handleError = (error) => {
//   if (error.response && error.response.status === 401) {
//     return <Navigate to={"/signIn"} />;
//   }
//   return "Has an error";
// };

export const findListCartByUser = createAsyncThunk("cart/findAll", async () => {
  const res = await BASE_URL.get("user/cart");
  return res.data.data;
});

export const addCart = createAsyncThunk(
  "cart/add",
  async (cartRequest, { rejectWithValue }) => {
    try {
      const res = await BASE_URL.post("user/cart", cartRequest);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      // return handleError(error);
    }
  }
);
// return rejectWithValue(error.response.data.data);

export const updateQuantityCart = createAsyncThunk(
  "cart/updateQuantity",
  async ({ cartId, newQuantity }, { rejectWithValue }) => {
    try {
      const res = await BASE_URL.put(`user/cart/${cartId}`, newQuantity);
      console.log(res);
      return res;
    } catch (error) {
      // return error.response.data.data
      return rejectWithValue(error.response.data.data);
    }
  }
);

export const deleteCart = createAsyncThunk(
  "cart/updateQuantity",
  async (cartId, { rejectWithValue }) => {
    try {
      const res = await BASE_URL.delete(`user/cart/${cartId}`);
      console.log(res);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data.data);
    }
  }
);

export const checkout = createAsyncThunk(
  "cart/checkout",
  async (checkoutRequest, { rejectWithValue }) => {
    try {
      const res = await BASE_URL.post(`user/cart/checkout`, checkoutRequest);
      console.log(res);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data.data);
    }
  }
);
