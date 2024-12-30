import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../api";

export const findAllHistoryView = createAsyncThunk(
  "history/findAll",
  async () => {
    const res = await BASE_URL.get("user/history");
    return res.data.data;
  }
);

export const createOrUpdateHistoryView = createAsyncThunk(
  "history/createOrUpdate",
  async (productId) => {
    const res = await BASE_URL.post(`user/history/products/${productId}`);
    return res;
  }
);
