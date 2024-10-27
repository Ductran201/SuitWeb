import { createSlice } from "@reduxjs/toolkit";
import { FAILED, PENDING, SUCCESS } from "../constants";
import {
  colorNoPagination,
  colorPagination,
} from "../../services/colorService";

const initialState = {
  loading: "idle",
  data: null,
  error: null,
  totalPages: 1,
  totalElements: null,
  numberOfElements: null,
};
const colorSlice = createSlice({
  name: "color",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // PAGINATION
    builder.addCase(colorPagination.pending, (state) => {
      state.loading = PENDING;
    });

    builder.addCase(colorPagination.fulfilled, (state, action) => {
      const { content, totalPages, totalElements, numberOfElements } =
        action.payload;
      state.loading = SUCCESS;
      state.data = content;
      state.totalPages = totalPages;
      state.totalElements = totalElements;
      state.numberOfElements = numberOfElements;
    });

    builder.addCase(colorPagination.rejected, (state, action) => {
      state.loading = FAILED;
      state.error = action.error;
    });
    // GET ALL

    builder.addCase(colorNoPagination.fulfilled, (state, action) => {
      state.loading = SUCCESS;
      state.data = action.payload;
    });
  },
});

export default colorSlice.reducer;
