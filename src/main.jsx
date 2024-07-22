import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "@haiilo/catalyst/dist/catalyst/scss/index.scss";
import { catIconRegistry } from "@haiilo/catalyst";
import { ci } from "@haiilo/catalyst-icons";
import { defineCustomElements } from "@haiilo/catalyst/loader";

import App from "./App.jsx";
import store from "./store.js";

import "./index.css";

defineCustomElements();
catIconRegistry.addIcons(ci);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
