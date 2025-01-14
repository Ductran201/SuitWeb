import { createSlice } from "@reduxjs/toolkit";

import { FAILED, PENDING, SUCCESS } from "../constants";

import {
  findOrderByIdUser,
  orderPaginationUser,
} from "../../services/orderUserService";

const initialState = {
  loading: "idle",
  data: null,
  orderDetail: null,
  error: null,
  totalPages: 1,
  totalElements: null,
  numberOfElements: null,
};

const orderSliceUser = createSlice({
  name: "orderUser",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Pagination
    builder
      .addCase(orderPaginationUser.pending, (state) => {
        state.loading = PENDING;
      })
      .addCase(orderPaginationUser.fulfilled, (state, action) => {
        const { content, totalPages, totalElements, numberOfElements } =
          action.payload;
        state.loading = SUCCESS;
        state.data = content;
        state.totalPages = totalPages;
        state.totalElements = totalElements;
        state.numberOfElements = numberOfElements;
      })
      .addCase(orderPaginationUser.rejected, (state, action) => {
        state.loading = FAILED;
        state.error = action.error;
      })
      // FindById
      .addCase(findOrderByIdUser.fulfilled, (state, action) => {
        state.loading = SUCCESS;
        state.orderDetail = action.payload;
      });
  },
});
export default orderSliceUser.reducer;
