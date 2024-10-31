import { createSlice } from "@reduxjs/toolkit";
import { productPagination, topNewestProduct } from "../../services/productService";
import { PENDING, SUCCESS } from "../constants";
import { findAllProductByCategory } from "../../services/categoryService";
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
    // Pagination
    builder.addCase(productPagination.fulfilled, (state, action) => {
      const { content, totalPages, totalElements, numberOfElements } =
        action.payload;
      state.loading = SUCCESS;
      state.data = content;
      state.totalPages = totalPages;
      state.totalElements = totalElements;
      state.numberOfElements = numberOfElements;
    });

    // Top product
    builder.addCase(topNewestProduct.fulfilled,(state,action)=>{
      state.loading =SUCCESS
      state.data = action.payload
    })

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
    builder.addCase(productPagination.rejected, (state, action) => {
      state.loading = FAILED;
      state.error = action.error;
    });

    
  },
});

export default productSlice.reducer;
