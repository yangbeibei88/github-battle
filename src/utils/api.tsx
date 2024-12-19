export async function getProfile(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    const profile = await response.json();
    // {
    //   "message": "Not Found",
    //   "documentation_url": "https://docs.github.com/rest",
    //   "status": "404"
    //   }
    if (response.ok === true) {
      return profile;
    }

    // TODO: CREATE USER TYPE/INTERFACE
    // https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-a-user-using-their-id

    throw new Error(getErrorMsg(profile.message, username));
  } catch (error) {
    if (error instanceof Error) {
      return {
        error,
      };
    }
  }
}

export async function getRepos(username: string) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=created&direction=desc&per_page=30`
    );

    const repos = await response.json();

    if (response.ok === true) {
      return repos;
    }

    throw new Error(getErrorMsg(repos.message, username));
  } catch (error) {
    if (error instanceof Error) {
      return {
        error,
      };
    }
  }
}

function getStartCount(repos: Record<string, any>[]) {
  return repos.reduce((acc, cur) => acc + cur.stargazers_count, 0);
}

function calculateScore(followers: number, repos: Record<string, any>[]) {
  return followers * 3 + getStartCount(repos);
}

function getPlayerData(player: string) {
  try {
    return Promise.all([getProfile(player), getRepos(player)]).then(
      ([profile, repos]) => ({
        profile,
        score: calculateScore(profile.followers, repos),
      })
    );
  } catch (error) {
    if (error instanceof Error) {
      return {
        error,
      };
    }
  }
}

// function sortPlayer(players: string[]) {
//   return players.sort((a: string, b: string) => {
//     if (getPlayerData(a) && getPlayerData(b)) {
//       return getPlayerData(b).score - getPlayerData(a).score;
//     }
//   });
// }

function getErrorMsg(message: string, username: string) {
  if (message === "Not Found") {
    return `${username} doesn't exist.`;
  }
  return message;
}
