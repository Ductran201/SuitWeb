import { createSlice } from "@reduxjs/toolkit";

import { FAILED, PENDING, SUCCESS } from "../constants";

import {
  findOrderById,
  orderPaginationAdmin,
} from "../../services/orderService";

const initialState = {
  loading: "idle",
  data: null,
  orderDetail: null,
  error: null,
  totalPages: 1,
  totalElements: null,
  numberOfElements: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Pagination
    builder
      .addCase(orderPaginationAdmin.pending, (state) => {
        state.loading = PENDING;
      })
      .addCase(orderPaginationAdmin.fulfilled, (state, action) => {
        const { content, totalPages, totalElements, numberOfElements } =
          action.payload;
        state.loading = SUCCESS;
        state.data = content;
        state.totalPages = totalPages;
        state.totalElements = totalElements;
        state.numberOfElements = numberOfElements;
      })
      .addCase(orderPaginationAdmin.rejected, (state, action) => {
        state.loading = FAILED;
        state.error = action.error;
      })
      // FindById
      .addCase(findOrderById.fulfilled, (state, action) => {
        state.loading = SUCCESS;
        state.orderDetail = action.payload;
      });
  },
});
export default orderSlice.reducer;
