import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //altera o estilo dos componentes do primeReact

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
