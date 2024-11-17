import { Cookie } from "@mui/icons-material";
import axios from "axios";
// import { Cookies } from "react-cookie";
import Cookies from "js-cookie";

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

const handleAddInterceptors = (instance) => {
  // Request
  instance.interceptors.request.use(
    (config) => {
      // const cookies = new Cookies();

      // const accessToken = cookies.get("accessToken");

      // if (accessToken) {
      //   config.headers.Authorization = `Bearer ${accessToken.data.accessToken}`;
      // }

      // WARNING
      const cookies = JSON.parse(Cookies.get("objectCookies") || null);
      if (cookies) {
        config.headers.Authorization = `Bearer ${cookies.data.accessToken}`;
      }
      return config;
    },
    (err) => Promise.reject(err)
  );
  // Response
};

handleAddInterceptors(BASE_URL);
handleAddInterceptors(FORM_DATA);
