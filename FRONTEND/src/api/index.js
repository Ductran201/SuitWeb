import axios from "axios";

export const BASE_URL = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "http://localhost:9999/api.com/v2/",
});

export const FORM_DATA = axios.create({
  headers: {
    "Content-Type": "multipart/form-data",
  },
  baseURL: "http://localhost:9999/api.com/v2/",
});
