import { createSlice } from "@reduxjs/toolkit";
import {
  findProductById,
  productPagination,
  topNewestProduct,
} from "../../services/productService";
import { FAILED, PENDING, SUCCESS } from "../constants";
import { findAllProductByCategory } from "../../services/categoryService";

const initialState = {
  loading: "idle",
  data: null,
  productInfor: null,
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
    // Pagination
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

    // Top product

    builder.addCase(topNewestProduct.fulfilled, (state, action) => {
      state.loading = SUCCESS;
      state.data = action.payload;
    });

    // All product each category

    builder.addCase(findAllProductByCategory.fulfilled, (state, action) => {
      const { content, totalPages, totalElements, numberOfElements } =
        action.payload;
      state.loading = SUCCESS;
      state.data = content;
      state.totalPages = totalPages;
      state.totalElements = totalElements;
      state.numberOfElements = numberOfElements;
    });
    // Find product by id

    builder.addCase(findProductById.fulfilled, (state, action) => {
      state.loading = SUCCESS;
      state.productInfor = action.payload;
      console.log(action.payload);
    });
  },
});
export default productSlice.reducer;
