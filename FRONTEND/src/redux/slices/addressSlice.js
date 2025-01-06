import { createSlice } from "@reduxjs/toolkit";

import { FAILED, PENDING, SUCCESS } from "../constants";
import {
  findAllAddress,
  findDefaultAddress,
} from "../../services/addressService";

const initialState = {
  loading: "idle",
  data: null,
  addressDefault: null,
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Pagination
    builder
      .addCase(findAllAddress.pending, (state) => {
        state.loading = PENDING;
      })
      .addCase(findAllAddress.fulfilled, (state, action) => {
        // const { content } = action.payload;
        state.loading = SUCCESS;
        state.data = action.payload;
      })
      .addCase(findAllAddress.rejected, (state, action) => {
        state.loading = FAILED;
        state.error = action.error;
      });

    // Find product by id

    builder.addCase(findDefaultAddress.fulfilled, (state, action) => {
      state.loading = SUCCESS;
      state.addressDefault = action.payload;
    });
  },
});
export default addressSlice.reducer;
