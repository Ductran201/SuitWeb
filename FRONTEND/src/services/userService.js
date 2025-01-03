import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, FORM_DATA } from "../api";
// import { Cookies } from "react-cookie";
import Cookies from "js-cookie";

// Handle error message
const handleErrorMessage = (error) => {
  if (error.response.data.code === 409) {
    return error.response.data.data;
  } else if (error.response.data.code === 401) {
    return error.response.data.data;
  }
  return "othre error";
};

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (formSignUp, { rejectWithValue }) => {
    try {
      const res = await BASE_URL.post("auth/signUp", formSignUp);
      return res;
    } catch (error) {
      return rejectWithValue(handleErrorMessage(error));
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (formSignIn, { rejectWithValue }) => {
    try {
      const res = await BASE_URL.post("auth/signIn", formSignIn);
      // Set cookies in 10 sec
      Cookies.set("objectCookies", JSON.stringify(res.data), {
        expires: 10000 / 86400,
      });
      //  const cookies = new Cookies();
      //  cookies.set("accessToken", res.data, { maxAge: 86400000 });
      // console.log(cookies);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(handleErrorMessage(error));
    }
  }
);

export const signOut = createAsyncThunk("auth/signOut", async () => {
  {
    // const cookies = new Cookies();
    // cookies.remove("accessToken");
    Cookies.remove("objectCookies");
  }
});

export const loadUserFromCookie = createAsyncThunk(
  "auth/loadUser",
  async (token) => {
    return token;
  }
);

// USER

export const getUserInfor = createAsyncThunk("user/getInfor", async () => {
  const res = await BASE_URL.get("user/account");
  return res.data.data;
});

export const editUserInfor = createAsyncThunk("user/editUser", async (user) => {
  const res = await FORM_DATA.put("user/account", user);
  console.log(res);
  return res.data.data;
});

export const userPagination = createAsyncThunk(
  "user/pagination",
  async ({ page, search, size, sortField, sortDirection }) => {
    const res = await BASE_URL.get(
      `admin/users?page=${
        page - 1
      }&search=${search}&size=${size}&sortField=${sortField}&sortDirection=${sortDirection}`
    );
    return res.data.data;
  }
);

export const toggleStatusUser = createAsyncThunk(
  "user/toggleStatus",
  async (id) => {
    const res = await BASE_URL.put(`admin/users/${id}`);
    return res;
  }
);
