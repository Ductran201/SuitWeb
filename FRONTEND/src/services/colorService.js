import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../api";

export const colorPagination = createAsyncThunk(
  "color/pagination",
  async ({ page, size, search, sortField, sortDirection }) => {
    const res = await BASE_URL.get(
      `admin/colors?page=${
        page - 1
      }&size=${size}&sortField=${sortField}&sortDirection=${sortDirection}&search=${search}`
    );
    return res.data.data;
  }
);

export const colorNoPagination = createAsyncThunk(
  "color/noPagination",
  async () => {
    const res = await BASE_URL.get("admin/colors?noPagination=true");
    return res.data.data;
  }
);

export const addColor = createAsyncThunk("color/add", async (color) => {
  const res = await BASE_URL.post("admin/colors", color);
  return res;
});

export const editColor = createAsyncThunk(
  "color/edit",
  async ({ color, id }) => {
    const res = await BASE_URL.put(`admin/colors/${id}`, color);
    return res;
  }
);

export const deleteColor = createAsyncThunk("color/delete", async (id) => {
  const res = await BASE_URL.delete(`admin/colors/${id}`);
  return res;
});

export const toggleStatusColor = createAsyncThunk(
  "color/toggleStatus",
  async (id) => {
    const res = await BASE_URL.put(`admin/colors/${id}/status`);
    return res;
  }
);
