import { createSlice } from "@reduxjs/toolkit";
import { productPagination } from "../../services/productService";
import { PENDING, SUCCESS } from "../constants";
const initialState = {
  loading: "idle",
  data: null,
  error: null,
  totalPages: 1,
  totalElements: null,
  numberOfElements: null,
};
const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(productPagination.pending, (state) => {
      state.loading = PENDING;
    });
    builder.addCase(productPagination.fulfilled, (state, action) => {
      const { content, totalPages, totalElements, numberOfElements } =
        action.payload;
      state.loading = SUCCESS;
      state.data = content;
      state.totalPages = totalPages;
      state.totalElements = totalElements;
      state.numberOfElements = numberOfElements;
    });
    builder.addCase(productPagination.rejected, (state, action) => {
      state.loading = FAILED;
      state.error = action.error;
    });
  },
});

export default productSlice.reducer;
