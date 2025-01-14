import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../api";

export const orderPaginationAdmin = createAsyncThunk(
  "order/paginationAdmin",
  async ({ page, search, size, sortField, sortDirection }) => {
    const res = await BASE_URL.get(
      `admin/orders?search=${search}&page=${page - 1}`
    );
    return res.data.data;
  }
);

export const findOrderById = createAsyncThunk(
  "order/findById",
  async (orderId) => {
    const res = await BASE_URL.get(`admin/orders/${orderId}`);
    return res.data.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/updateStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const res = await BASE_URL.put(
        `admin/orders/${orderId}/status/${status}`
      );
      console.log(res);
      return res;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response?.data || "something went wrong!!");
    }
  }
);
