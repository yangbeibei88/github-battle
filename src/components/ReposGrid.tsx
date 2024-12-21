import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle,
} from "react-icons/fa";
import type { Repo } from "../utils/types.tsx";
import { Card } from "./Card.tsx";

export function ReposGrid({ repos }: { repos: Repo[] }) {
  return (
    <ul className="grid">
      {repos.map((repo, index) => {
        const {
          id,
          name,
          owner,
          html_url,
          stargazers_count,
          forks,
          open_issues,
        } = repo;
        const { login, avatar_url, url } = owner;
        return (
          <li key={id}>
            <Card
              header={`#${index + 1}`}
              avatar={avatar_url}
              href={html_url}
              name={name}
            >
              <ul className="my-5 text-lg">
                <li className="flex items-center m-2">
                  <FaUser color="rgb(255, 191, 116)" size={22} />
                  <a href={url}>{login}</a>
                </li>
                <li className="flex items-center m-2">
                  <FaStar color="rgb(255, 191, 116)" size={22} />
                  <span>{stargazers_count} stars</span>
                </li>
                <li className="flex items-center m-2">
                  <FaCodeBranch color="rgb(255, 215, 0)" size={22} />
                  <span>{forks} forks</span>
                </li>
                <li className="flex items-center m-2">
                  <FaExclamationTriangle color="rgb(255, 215, 0)" size={22} />
                  <span>{open_issues} open issues</span>
                </li>
              </ul>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}
