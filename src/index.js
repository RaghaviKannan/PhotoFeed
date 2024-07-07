import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { PhotoProvider } from "./Context/PhotoContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <PhotoProvider>
    <App />
  </PhotoProvider>
);
