import { NavLink } from "react-router";
import { useContext } from "react";
import { ThemeContext } from "../contexts/theme.tsx";

export function Nav({ toggleTheme }: { toggleTheme: () => void }) {
  // const [theme, setTheme] = useState<Theme>("system");
  const theme = useContext(ThemeContext);
  return (
    <nav className="sticky top-0 z-30 flex justify-between items-center px-2 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex list-none">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link text-sky-500" : "nav-link"
              }
            >
              Popular
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/battle"
              className={({ isActive }) =>
                isActive ? "nav-link text-sky-500" : "nav-link"
              }
            >
              Battle
            </NavLink>
          </li>
        </ul>

        <button
          onClick={toggleTheme}
          className="border-none bg-transparent text-xl"
        >
          {theme === "light" ? "🔦" : "💡"}
        </button>
      </div>
    </nav>
  );
}
