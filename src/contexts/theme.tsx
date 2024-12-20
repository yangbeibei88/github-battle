import { createContext } from "react";
import type { Theme } from "../utils/types.tsx";

export const ThemeContext = createContext<Theme>("light");
