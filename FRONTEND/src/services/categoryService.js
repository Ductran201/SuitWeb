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

export const findAllProductByCategory = createAsyncThunk(
  "category/findAllProduct",
  async ({ id, page, search, size, sortField, sortDirection }) => {
    const res = await BASE_URL.get(
      `categories/${id}/products?page=${
        page - 1
      }&size=${size}&sortDirection=${sortDirection}&sortField=${sortField}&search=${search}`
    );
    return res.data.data;
  }
);

// Handle error message
const handleErrorMessage = (error) => {
  if (error.response && error.response.data.code === 409) {
    return "This category already exists";
  }
  return "Has an error";
};

export const addCategory = createAsyncThunk(
  "category/add",
  async (category, { rejectWithValue }) => {
    try {
      const res = await FORM_DATA.post("admin/categories", category);
      return res;
    } catch (error) {
      return rejectWithValue(handleErrorMessage(error));
    }
  }
);

export const editCategory = createAsyncThunk(
  "category/edit",
  async ({ category, id }, { rejectWithValue }) => {
    try {
      const res = await FORM_DATA.put(`admin/categories/${id}`, category);
      return res;
    } catch (error) {
      return rejectWithValue(handleErrorMessage(error));
    }
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
