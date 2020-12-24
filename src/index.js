import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import rootReducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: rootReducer
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
