import type { User, Repo, Repos } from "./types.tsx";

export async function getUser<T extends User>(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error(
        `Error fetching user for ${username} - ${response.status}`
      );
    }
    const user: Promise<T> = await response.json();
    // {
    //   "message": "Not Found",
    //   "documentation_url": "https://docs.github.com/rest",
    //   "status": "404"
    //   }

    return user;

    // https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-a-user-using-their-id
  } catch (error) {
    if (error instanceof Error) {
      console.error(`We have an error: ${error.message}`);
      throw new Error(error.message);
    }
  }
}

export async function getReposByUser<T extends Repo>(username: string) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=created&direction=desc&per_page=30`
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching repos for ${username} - ${response.status}`
      );
    }
    const repos: Promise<T[]> = await response.json();

    return repos;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`We have an error: ${error.message}`);
      throw new Error(error.message);
    }
  }
}

// sum of all repos' stargazers_count
function getStarCount(repos: Repo[]) {
  return repos.reduce((acc, cur) => acc + cur.stargazers_count, 0);
}

function calculateScore(followers: number, repos: Repo[]) {
  return followers * 3 + getStarCount(repos);
}

async function getPlayerData(player: string) {
  try {
    const [user, repos] = await Promise.all([
      getUser(player),
      getReposByUser(player),
    ]);

    if (user && repos) {
      return { user, score: calculateScore(user.followers, repos) };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}

export async function battle(players: [string, string]) {
  try {
    const [playerA, playerB] = await Promise.all([
      getPlayerData(players[0]),
      getPlayerData(players[1]),
    ]);

    if (playerA && playerB) {
      return [playerA, playerB].sort((a, b) => b.score - a.score);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}

export async function fetchPopularRepos<T extends Repos>(language: string) {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );
  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`Fetching error occurs - ${response.status}`);
    }
    const repos: Promise<T> = await response.json();

    return (await repos).items;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}
