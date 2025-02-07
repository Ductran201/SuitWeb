import { createSlice } from "@reduxjs/toolkit";
import { FAILED, PENDING, SUCCESS } from "../constants";
import { findAll } from "../../services/personService";

const initialState = {
  loading: "idle",
  data: null,
  error: null,
};
const personSlice = createSlice({
  name: "person",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(findAll.pending, (state) => {
      state.loading = PENDING;
    });

    builder.addCase(findAll.fulfilled, (state, action) => {
      state.loading = SUCCESS;
      state.data = action.payload;
    });

    builder.addCase(findAll.rejected, (state, action) => {
      state.loading = FAILED;
      state.error = action.error;
    });
  },
});

export default personSlice.reducer;
