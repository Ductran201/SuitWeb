import { createSlice } from "@reduxjs/toolkit";
import {
  productDetailNoPagination,
  productDetailPagination,
} from "../../services/productDetailService";
import { FAILED, PENDING, SUCCESS } from "../constants";

const initialState = {
  loading: "idle",
  data: null,
  error: null,
  totalPages: 1,
  totalElements: null,
  numberOfElements: null,
};

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // PAGINATION
    builder.addCase(productDetailPagination.pending, (state) => {
      state.loading = PENDING;
    });

    builder.addCase(productDetailPagination.fulfilled, (state, action) => {
      const { content, totalPages, totalElements, numberOfElements } =
        action.payload;
      state.loading = SUCCESS;
      state.data = content;
      state.totalPages = totalPages;
      state.totalElements = totalElements;
      state.numberOfElements = numberOfElements;
    });

    builder.addCase(productDetailPagination.rejected, (state, action) => {
      state.loading = FAILED;
      state.error = action.error;
    });
    // GET ALL

    // builder.addCase(productDetailNoPagination.fulfilled, (state, action) => {
    //   state.loading = SUCCESS;
    //   state.data = action.payload;
    // });
  },
});

export default productDetailSlice.reducer;
