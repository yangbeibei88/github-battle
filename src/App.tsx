import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import { Theme } from "./utils/types.tsx";
import { ThemeContext } from "./contexts/theme.tsx";
import { Nav } from "./components/Nav.tsx";
import { Popular } from "./pages/Popular.tsx";
import { Battle } from "./pages/Battle.tsx";

function App() {
  const [theme, setTheme] = useState<Theme>("light");
  const toggleTheme = () =>
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  return (
    <BrowserRouter>
      <ThemeContext.Provider value={theme}>
        <div className={theme}>
          <div className="">
            <Nav toggleTheme={toggleTheme} />
            <Routes>
              <Route path="/" Component={Popular} />
              <Route path="/battle" Component={Battle} />
            </Routes>
          </div>
        </div>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
