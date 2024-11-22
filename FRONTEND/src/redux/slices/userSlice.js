import { createSlice } from "@reduxjs/toolkit";
import { getUserInfor, userPagination } from "../../services/userService";
import { FAILED, PENDING, SUCCESS } from "../constants";
const initialState = {
  loading: "idle",
  infor: null,
  data: null,
  error: null,
  totalPages: 1,
  totalElements: null,
  numberOfElements: null,
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // PAGINATION
    builder.addCase(userPagination.pending, (state) => {
      state.loading = PENDING;
    });

    builder.addCase(userPagination.fulfilled, (state, action) => {
      const { content, totalPages, totalElements, numberOfElements } =
        action.payload;
      state.loading = SUCCESS;
      state.data = content;
      state.totalPages = totalPages;
      state.totalElements = totalElements;
      state.numberOfElements = numberOfElements;
    });

    builder.addCase(userPagination.rejected, (state, action) => {
      state.loading = FAILED;
      state.error = action.error;
    });

    builder.addCase(getUserInfor.fulfilled, (state, action) => {
      state.loading = SUCCESS;
      state.infor = action.payload;
    });
  },
});

export default userSlice.reducer;
