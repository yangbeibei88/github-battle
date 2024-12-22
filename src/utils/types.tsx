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
  name: string;
  avatar_url: string;
  url: string;
  followers: number;
  following: number;
  public_repos: number;
  location: string | null;
  company: string | null;
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
