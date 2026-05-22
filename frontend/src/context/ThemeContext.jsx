import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const [sparkleEnabled, setSparkleEnabled] = useState(
    localStorage.getItem("sparkleEnabled") === "true" || true // persist preference
  );

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("sparkleEnabled", sparkleEnabled);
  }, [sparkleEnabled]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleSparkle = () => {
    setSparkleEnabled((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, sparkleEnabled, toggleSparkle  }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
