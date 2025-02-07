import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../api";

export const findMessagePagination = createAsyncThunk(
  "message/pagination",
  async () => {
    const res = await BASE_URL.get(`/chatroom`);
    return res;
  }
);

export const addMessage = createAsyncThunk("comment/add", async (message) => {
  const res = await BASE_URL.post(`user/messages`, message);
  return res;
});

export const editMessage = createAsyncThunk("message/edit", async (message) => {
  const res = await BASE_URL.put(`user/messages/${id}`, message);
  return res;
});

export const deleteMessage = createAsyncThunk(
  "message/delete",
  async (messageId) => {
    const res = await BASE_URL.delete(`user/Messages/${messageId}`);
    return res;
  }
);
