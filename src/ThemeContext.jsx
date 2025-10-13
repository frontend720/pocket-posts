import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme ? JSON.parse(savedTheme) : false;
    } catch (error) {
      console.log("Unable to retrieve saved theme.", error);
    }
    return false;
  });

  useEffect(() => {
    try {
      localStorage.setItem("theme", JSON.stringify(theme));
    } catch (error) {
      console.log("Unable to save theme", error);
    }
  }, [theme]);

  function onThemeChange() {
    setTheme((prev) => !prev);
  }
  return (
    <ThemeContext.Provider value={{ theme, onThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeContextProvider };
