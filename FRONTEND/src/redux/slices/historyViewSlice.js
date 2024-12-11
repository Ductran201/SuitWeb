import { Pending } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";
import { findAllHistoryView } from "../../services/historyService";
import { FAILED, PENDING, SUCCESS } from "../constants";

const initialState = {
  loading: "idle",
  data: null,
  error: null,
  totalPages: 1,
  totalElements: null,
  numberOfElements: null,
};

const historyViewSlice = createSlice({
  name: "historyView",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findAllHistoryView.pending, (state) => {
        state.loading = PENDING;
      })
      .addCase(findAllHistoryView.fulfilled, (state, action) => {
        const { content, totalPages, totalElements, numberOfElements } =
          action.payload;
        state.loading = SUCCESS;
        state.data = content;
        state.totalPages = totalPages;
        state.totalElements = totalElements;
        state.numberOfElements = numberOfElements;
      })
      .addCase(findAllHistoryView.rejected, (state, action) => {
        state.loading = FAILED;
        state.error = action.error;
      });
  },
});

export default historyViewSlice.reducer;
