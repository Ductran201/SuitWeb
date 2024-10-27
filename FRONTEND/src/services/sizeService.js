import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../api";

export const sizePagination = createAsyncThunk(
  "size/pagination",
  async ({ page, size, search, sortField, sortDirection }) => {
    const res = await BASE_URL.get(
      `admin/sizes?page=${
        page - 1
      }&size=${size}&sortField=${sortField}&sortDirection=${sortDirection}&search=${search}`
    );
    return res.data.data;
  }
);

export const sizeNoPagination = createAsyncThunk(
  "size/noPagination",
  async () => {
    const res = await BASE_URL.get("admin/sizes?noPagination=true");
    return res.data.data;
  }
);

export const addSize = createAsyncThunk("size/add", async (size) => {
  const res = await BASE_URL.post("admin/sizes", size);
  return res;
});

export const editSize = createAsyncThunk("size/edit", async ({ size, id }) => {
  const res = await BASE_URL.put(`admin/sizes/${id}`, size);
  return res;
});

export const deleteSize = createAsyncThunk("size/delete", async (id) => {
  const res = await BASE_URL.delete(`admin/sizes/${id}`);
  return res;
});

export const toggleStatusSize = createAsyncThunk(
  "size/toggleStatus",
  async (id) => {
    const res = await BASE_URL.put(`admin/sizes/${id}/status`);
    return res;
  }
);
