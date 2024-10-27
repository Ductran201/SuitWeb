import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routerAll from "./routers/index.jsx";
import { Provider } from "react-redux";
import store from "./redux/store/index.js";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={routerAll} />
  </Provider>
  // </StrictMode>
);
