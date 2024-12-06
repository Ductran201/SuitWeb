import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../api";
import { message } from "antd";

export const findAllWishList = createAsyncThunk(
  "wishList/findAll",
  async () => {
    const res = await BASE_URL.get("user/wish-list");
    return res.data.data;
  }
);

export const toggleWishList = createAsyncThunk(
  "wishList/toggle",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await BASE_URL.post(`user/wish-list/${productId}`);
      console.log(res);
      return res;
    } catch (error) {
      // return error.response.data.data
      return rejectWithValue(error.response.data.data);
    }
  }
);

export const deleteWishList = createAsyncThunk(
  "wishList/delete",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await BASE_URL.delete(`user/wish-list/${productId}`);
      console.log(res);
      return res;
    } catch (error) {
      // return error.response.data.data
      return rejectWithValue(error.response.data.data);
    }
  }
);
