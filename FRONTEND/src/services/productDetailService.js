import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, FORM_DATA } from "../api";

export const productDetailPagination = createAsyncThunk(
  "productDetail/pagination",
  async ({ page, search, size, sortField, sortDirection, productId }) => {
    const res = await BASE_URL.get(
      `admin/productDetails/products/${productId}?page=${
        page - 1
      }&search=${search}&size=${size}&sortField=${sortField}&sortDirection=${sortDirection}`
    );
    return res.data.data;
  }
);

export const productDetailNoPagination = createAsyncThunk(
  "productDetail/noPagination",
  async () => {
    const res = await BASE_URL.get("admin/productDetails?noPagination=true");
    return res.data.data;
  }
);

export const addProductDetail = createAsyncThunk(
  "productDetail/add",
  async (productDetail) => {
    const res = await BASE_URL.post("admin/productDetails", productDetail);
    return res;
  }
);

export const editProductDetail = createAsyncThunk(
  "productDetail/edit",
  async ({ productDetail, id }) => {
    const res = await BASE_URL.put(`admin/productDetails/${id}`, productDetail);
    return res;
  }
);

export const deleteProductDetail = createAsyncThunk(
  "productDetail/delete",
  async (id) => {
    const res = await BASE_URL.delete(`admin/productDetails/${id}`);
    return res;
  }
);

export const toggleStatusProductDetail = createAsyncThunk(
  "productDetail/toggleStatus",
  async (id) => {
    const res = await BASE_URL.put(`admin/productDetails/${id}/toggleStatus`);
    return res;
  }
);
