interface Profile {
  login: string;
  avatar_url: string;
  url: string;
  followers: number;
}

interface Repo {
  stargazers_count: number;
  // message?: string;
}

export async function getProfile<T extends Profile>(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    const profile: Promise<T> = await response.json();
    // {
    //   "message": "Not Found",
    //   "documentation_url": "https://docs.github.com/rest",
    //   "status": "404"
    //   }
    if (!response.ok) {
      throw new Error(`Error fetching profile for ${username}`);
    }
    return profile;

    // https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-a-user-using-their-id
  } catch (error) {
    if (error instanceof Error) {
      console.error(`We have an error: ${error.message}`);
      throw new Error(error.message);
    }
  }
}

export async function getRepos<T extends Repo>(username: string) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=created&direction=desc&per_page=30`
    );

    const repos: Promise<T[]> = await response.json();

    if (!response.ok) {
      throw new Error(`Error fetching repos for ${username}`);
    }

    return repos;
    // const response = await fetch(
    //   `https://api.github.com/users/${username}/repos?sort=created&direction=desc&per_page=30`
    // );

    // const repos: Promise<T> = await response.json();

    // if (response.ok === true) {
    //   return repos;
    // }

    // throw new Error(getErrorMsg(repos.message, username));
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
    const [profile, repos] = await Promise.all([
      getProfile(player),
      getRepos(player),
    ]);

    if (profile && repos) {
      return { profile, score: calculateScore(profile.followers, repos) };
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

export async function fetchPopularRepos(language: string) {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );
  try {
    const response = await fetch(endpoint);
    const repos = await response.json();
    if (response.ok === true && repos.items) {
      return repos.items;
    }
    throw new Error(repos.message);
  } catch (error) {
    if (error instanceof Error) {
      return { error };
    }
  }
}
