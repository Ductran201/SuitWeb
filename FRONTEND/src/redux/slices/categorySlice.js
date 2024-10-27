import { createSlice } from "@reduxjs/toolkit";
import {
  categoryNoPagination,
  categoryPagination,
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
    builder.addCase(categoryPagination.pending, (state) => {
      state.loading = PENDING;
    });

    builder.addCase(categoryPagination.fulfilled, (state, action) => {
      const { content, totalPages, totalElements, numberOfElements } =
        action.payload;
      state.loading = SUCCESS;
      state.data = content;
      state.totalPages = totalPages;
      state.totalElements = totalElements;
      state.numberOfElements = numberOfElements;
    });

    builder.addCase(categoryPagination.rejected, (state, action) => {
      state.loading = FAILED;
      state.error = action.error;
    });
    // GET ALL

    builder.addCase(categoryNoPagination.fulfilled, (state, action) => {
      state.loading = SUCCESS;
      state.data = action.payload;
    });
  },
});

export default categorySlice.reducer;
