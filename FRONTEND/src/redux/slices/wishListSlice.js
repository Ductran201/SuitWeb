import { createSlice } from "@reduxjs/toolkit";
import { PENDING, SUCCESS } from "../constants";
import { findAllWishList } from "../../services/wishList";

const initialState = {
  data: null,
  error: null,
  loading: "idle",
};
const wishList = createSlice({
  initialState: initialState,
  name: "wishList",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findAllWishList.pending, (state) => {
        state.loading = PENDING;
      })
      .addCase(findAllWishList.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = SUCCESS;
      })
      .addCase(findAllWishList.rejected, (state, action) => {
        state.data = action.payload;
        state.loading = SUCCESS;
      });
  },
});

export default wishList.reducer;
