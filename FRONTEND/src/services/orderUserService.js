import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../api";

export const orderPaginationUser = createAsyncThunk(
  "order/paginationUser",
  async ({ page, search, size, sortField, sortDirection }) => {
    const res = await BASE_URL.get(
      `user/orders?search=${search}&page=${page - 1}`
    );
    return res.data.data;
  }
);

export const findOrderByIdUser = createAsyncThunk(
  "order/findById",
  async (orderId) => {
    const res = await BASE_URL.get(`user/orders/${orderId}`);
    return res.data.data;
  }
);

export const cancelOrder = createAsyncThunk(
  "order/cancel",
  async ({ orderId }, { rejectWithValue }) => {
    try {
      const res = await BASE_URL.put(`user/orders/${orderId}/cancel`);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || "something went wrong!!");
    }
  }
);
