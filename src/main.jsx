import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";

const ClassicApp = lazy(() => import("./classic/ClassicApp.jsx"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/classic" element={<ClassicApp />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
