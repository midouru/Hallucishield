import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { VerificationProvider } from "./context/VerificationContext";
import "react-circular-progressbar/dist/styles.css";
import App from "./App";
// @ts-ignore
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <VerificationProvider>
        <App />
      </VerificationProvider>
    </BrowserRouter>
  </React.StrictMode>,
);