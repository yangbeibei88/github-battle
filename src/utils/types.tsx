export type Theme = "light" | "dark" | "system";
export type Language =
  | "All"
  | "TypeScript"
  | "JavaScript"
  | "Python"
  | "Java"
  | "Rust"
  | "Ruby"
  | "CSS";

export interface User {
  login: string;
  avatar_url: string;
  url: string;
  followers: number;
}

export interface Repo {
  id: number;
  name: string;
  owner: User;
  html_url: string;
  stargazers_count: number;
  forks: number;
  open_issues: number;
}

export interface Repos {
  items: Repo[];
}
