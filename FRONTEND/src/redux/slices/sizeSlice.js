import { createSlice } from "@reduxjs/toolkit";
import { FAILED, PENDING, SUCCESS } from "../constants";
import { sizeNoPagination, sizePagination } from "../../services/sizeService";

const initialState = {
  loading: "idle",
  data: null,
  error: null,
  totalPages: 1,
  totalElements: null,
  numberOfElements: null,
};
const sizeSlice = createSlice({
  name: "size",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // PAGINATION
    builder.addCase(sizePagination.pending, (state) => {
      state.loading = PENDING;
    });

    builder.addCase(sizePagination.fulfilled, (state, action) => {
      const { content, totalPages, totalElements, numberOfElements } =
        action.payload;
      state.loading = SUCCESS;
      state.data = content;
      state.totalPages = totalPages;
      state.totalElements = totalElements;
      state.numberOfElements = numberOfElements;
    });

    builder.addCase(sizePagination.rejected, (state, action) => {
      state.loading = FAILED;
      state.error = action.error;
    });
    // GET ALL

    builder.addCase(sizeNoPagination.fulfilled, (state, action) => {
      state.loading = SUCCESS;
      state.data = action.payload;
    });
  },
});

export default sizeSlice.reducer;
