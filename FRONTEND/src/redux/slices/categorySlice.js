import { createSlice } from "@reduxjs/toolkit";
import {
  categoryNoPagination,
  categoryPaginationAdmin,
  findAllProductByCategory,
} from "../../services/categoryService";
import { FAILED, PENDING, SUCCESS } from "../constants";

const initialState = {
  loading: "idle",
  data: null,
  error: null,
  totalPages: 1,
  totalElements: null,
  numberOfElements: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // PAGINATION
    builder.addCase(categoryPaginationAdmin.pending, (state) => {
      state.loading = PENDING;
    });

    builder.addCase(categoryPaginationAdmin.fulfilled, (state, action) => {
      const { content, totalPages, totalElements, numberOfElements } =
        action.payload;
      state.loading = SUCCESS;
      state.data = content;
      state.totalPages = totalPages;
      state.totalElements = totalElements;
      state.numberOfElements = numberOfElements;
    });

    // NO PAGINATION
    builder.addCase(categoryNoPagination.fulfilled, (state, action) => {
      state.loading = SUCCESS;
      state.data = action.payload;
    });

    builder.addCase(categoryPaginationAdmin.rejected, (state, action) => {
      state.loading = FAILED;
      state.error = action.error;
    });
  },
});

export default categorySlice.reducer;
