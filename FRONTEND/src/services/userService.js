import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../api";

export const signUp = createAsyncThunk("user/signUp", async () => {
  const res = await BASE_URL.post("auth/signUp");
  return res;
});

export const signIn = createAsyncThunk("user/signIn", async () => {
  const res = await BASE_URL.post("auth/signIn");
  return res;
});

export const userPagination = createAsyncThunk(
  "user/pagination",
  async ({ page, search, size, sortField, sortDirection }) => {
    const res = await BASE_URL.get(
      `admin/users?page=${
        page - 1
      }&search=${search}&size=${size}&sortField=${sortField}&sortDirection=${sortDirection}`
    );
    return res.data.data;
  }
);

export const toggleStatusUser = createAsyncThunk(
  "user/toggleStatus",
  async (id) => {
    const res = await BASE_URL.put(`admin/users/${id}`);
    return res;
  }
);
