import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../api";

export const findAll = createAsyncThunk("person/findAll", async () => {
  const res = await BASE_URL.get("/persons");
  return res.data;
});

export const addPerson = createAsyncThunk("person/add", async (person) => {
  const res = await BASE_URL.post("persons", person);
  return res;
});
