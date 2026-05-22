import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import "./index.css";
import enableSparkleCursor from "./components/SparkleCursor";
 
function Root() {
  const { sparkleEnabled } = useTheme();

  useEffect(() => {
    if (sparkleEnabled) {
      enableSparkleCursor();
    }
  }, [sparkleEnabled]);

  return <AppRouter />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Root />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
