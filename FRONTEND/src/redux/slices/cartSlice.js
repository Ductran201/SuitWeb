import { createSlice } from "@reduxjs/toolkit";
import { findListCartByUser } from "../../services/cartService";
import { PENDING, SUCCESS } from "../constants";

const initialState = {
  data: null,
  error: null,
  loading: "idle",
};
const cartSlice = createSlice({
  initialState: initialState,
  name: "listCart",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findListCartByUser.pending, (state) => {
        state.loading = PENDING;
      })
      .addCase(findListCartByUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = SUCCESS;
      })
      .addCase(findListCartByUser.rejected, (state, action) => {
        state.data = action.payload;
        state.loading = SUCCESS;
      });
  },
});

export default cartSlice.reducer;
