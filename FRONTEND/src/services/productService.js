import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, FORM_DATA } from "../api";

export const productPagination = createAsyncThunk(
  "product/pagination",
  async ({ page, search, size, sortField, sortDirection }) => {
    const res = await BASE_URL.get(
      `admin/products?page=${
        page - 1
      }&size=${size}&sortField=${sortField}&sortDirection=${sortDirection}&search=${search}`
    );
    return res.data.data;
  }
);

export const addProduct = createAsyncThunk("product/add", async (product) => {
  const res = await FORM_DATA.post("admin/products", product);
  console.log(res);
  return res;
});

export const editProduct = createAsyncThunk(
  "product/edit",
  async ({ product, id }) => {
    const res = await FORM_DATA.put(`admin/products/${id}`, product);
    console.log(res);
    return res;
  }
);

export const deleteProduct = createAsyncThunk("product/delete", async (id) => {
  const res = await BASE_URL.delete(`admin/products/${id}`);
  return res;
});

export const toggleStatusProduct = createAsyncThunk(
  "product/toggleStatus",
  async (id) => {
    const res = await BASE_URL.put(`admin/products/${id}/status`);
    return res;
  }
);
