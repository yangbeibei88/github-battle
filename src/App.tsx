import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import { Theme } from "./utils/types.tsx";
import { ThemeContext } from "./contexts/theme.tsx";
import { Nav } from "./components/Nav.tsx";
import { Loading } from "./components/Loading.tsx";

const Popular = React.lazy(() => import("./pages/Popular.tsx"));
const Battle = React.lazy(() => import("./pages/Battle.tsx"));
const Results = React.lazy(() => import("./pages/Results.tsx"));

function App() {
  const [theme, setTheme] = useState<Theme>("light");
  const toggleTheme = () =>
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  return (
    <BrowserRouter>
      <ThemeContext.Provider value={theme}>
        <div className={theme}>
          <Nav toggleTheme={toggleTheme} />
          <React.Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" Component={Popular} />
              <Route path="/battle" Component={Battle} />
              <Route path="/battle/results" Component={Results} />
            </Routes>
          </React.Suspense>
        </div>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
