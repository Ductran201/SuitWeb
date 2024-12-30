import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../api";

export const findAllAddress = createAsyncThunk(
  "address/pagination",
  async () => {
    const res = await BASE_URL.get(`user/addresses`);
    // console.log(res);
    return res.data.data;
  }
);

export const findAddressById = createAsyncThunk(
  "address/findById",
  async (addressId) => {
    const res = await BASE_URL.get(`user/addresses/${addressId}`);
    return res.data.data;
  }
);

export const findDefaultAddress = createAsyncThunk(
  "address/findDefault",
  async () => {
    const res = await BASE_URL.get(`user/addresses/default`);
    return res.data.data;
  }
);

export const addAddress = createAsyncThunk("address/add", async (address) => {
  const res = await BASE_URL.post("user/addresses", address);
  return res;
});

export const editAddress = createAsyncThunk(
  "address/edit",
  async ({ address, addressId }) => {
    const res = await BASE_URL.put(`user/addresses/${addressId}`, address);
    return res;
  }
);

export const deleteAddress = createAsyncThunk(
  "address/delete",
  async (addressId) => {
    const res = await BASE_URL.delete(`user/addresses/${addressId}`);
    return res;
  }
);
