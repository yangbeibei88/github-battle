import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Theme } from "./utils/types.tsx";
import { ThemeContext } from "./contexts/theme.tsx";
import { Nav } from "./components/Nav.tsx";

import "./App.css";

function App() {
  const [theme, setTheme] = useState<Theme>("light");
  const toggleTheme = () =>
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  return (
    <BrowserRouter>
      <ThemeContext.Provider value={theme}>
        <div className={theme}>
          <div className="container">
            <Nav toggleTheme={toggleTheme} />
          </div>
        </div>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
