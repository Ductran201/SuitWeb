import { Button } from "@mui/material";
import axios from "axios";
import React from "react";

export default function Test() {
  console.log("Come into test");

  return (
    <div>
      <h1>Test</h1>
      <Button
        onClick={callApiSetCookieFromJava}
        variant="contained"
        className=""
      >
        Call API Test java set cookies
      </Button>

      <Button onClick={getDataWithAsyncAwait} variant="contained" className="">
        Send the request
      </Button>
    </div>
  );
}
