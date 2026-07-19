

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// @ts-ignore: side-effect import of CSS without type declarations
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
