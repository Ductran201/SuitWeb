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

export const productDetailById = createAsyncThunk(
  "productDtail/findById",
  async (id) => {
    const res = await BASE_URL.get(`admin/productDetails/${id}`);
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

export const addProductDetail = createAsyncThunk(
  "productDetail/add",
  async (productDetail, { rejectWithValue }) => {
    try {
      const res = await FORM_DATA.post("admin/productDetails", productDetail);
      return res;
    } catch (error) {
      return rejectWithValue(handleErrorMessage(error));
    }
  }
);

export const editProductDetail = createAsyncThunk(
  "productDetail/edit",
  async ({ productDetail, id }, { rejectWithValue }) => {
    try {
      const res = await FORM_DATA.put(
        `admin/productDetails/${id}`,
        productDetail
      );
      return res;
    } catch (error) {
      return rejectWithValue(handleErrorMessage(error));
    }
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
