import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";

import { Provider } from "react-redux";
import store from "./redux/store";
import router from "./routes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
