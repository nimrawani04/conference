import React from "react";
import ReactDOM from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App.jsx";
import { ConsentProvider } from "./context/ConsentProvider.jsx";
import { ThemeProvider } from "./context/ThemeProvider.jsx";
import YearProvider from "./context/YearProvider.jsx";
import "./App.css";
import "./index.css";

registerSW({ immediate: true });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <YearProvider>
        <ConsentProvider>
          <App />
        </ConsentProvider>
      </YearProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
