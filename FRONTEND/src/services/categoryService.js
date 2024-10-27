import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, FORM_DATA } from "../api";

export const categoryPagination = createAsyncThunk(
  "category/pagination",
  async ({ page, search, size, sortField, sortDirection }) => {
    const res = await BASE_URL.get(
      `admin/categories?page=${
        page - 1
      }&search=${search}&size=${size}&sortField=${sortField}&sortDirection=${sortDirection}`
    );
    return res.data.data;
  }
);

export const categoryNoPagination = createAsyncThunk(
  "category/noPagination",
  async () => {
    const res = await BASE_URL.get("admin/categories?noPagination=true");
    return res.data.data;
  }
);

export const addCategory = createAsyncThunk(
  "category/add",
  async (category) => {
    const res = await FORM_DATA.post("admin/categories", category);
    return res;
  }
);

export const editCategory = createAsyncThunk(
  "category/edit",
  async ({ category, id }) => {
    const res = await FORM_DATA.put(`admin/categories/${id}`, category);
    return res;
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id) => {
    const res = await BASE_URL.delete(`admin/categories/${id}`);
    return res;
  }
);

export const toggleStatusCategory = createAsyncThunk(
  "category/toggleStatus",
  async (id) => {
    const res = await BASE_URL.put(`admin/categories/${id}/toggleStatus`);
    return res;
  }
);
