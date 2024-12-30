import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../api";

export const findCommentPagination = createAsyncThunk(
  "comment/pagination",
  async (productId) => {
    const res = await BASE_URL.get(`/products/${productId}/comments`);
    // console.log(res);
    return res;
  }
);

export const addComment = createAsyncThunk(
  "comment/add",
  async ({ comment, productId }) => {
    const res = await BASE_URL.post(
      `user/products/${productId}/comments`,
      comment
    );
    return res;
  }
);

export const editComment = createAsyncThunk(
  "comment/edit",
  async ({ comment, productId }) => {
    const res = await BASE_URL.put(
      `user/products/${productId}/comments/${id}`,
      comment
    );
    return res;
  }
);

export const deleteComment = createAsyncThunk(
  "comment/delete",
  async ({ commentId, productId }) => {
    const res = await BASE_URL.delete(
      `user/products/${productId}/comments/${commentId}`
    );
    return res;
  }
);
