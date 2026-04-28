import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ConsentProvider } from "./context/ConsentProvider.jsx";
import { ThemeProvider } from "./context/ThemeProvider.jsx";
import YearProvider from "./context/YearProvider.jsx";
import "./App.css";
import "./index.css";

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
