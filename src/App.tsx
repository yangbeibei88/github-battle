import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import { Theme } from "./utils/types.tsx";
import { ThemeContext } from "./contexts/theme.tsx";
import { Nav } from "./components/Nav.tsx";
import { Popular } from "./pages/Popular.tsx";

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
            <Routes>
              <Route path="/" Component={Popular} />
            </Routes>
          </div>
        </div>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
