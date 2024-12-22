import { useState } from "react";
import { Instructions } from "../components/Instructions.tsx";
import { PlayerInput } from "../components/PlayerInput.tsx";
import { PlayerPreview } from "../components/PlayerPreview.tsx";
import { Link } from "react-router";

export function Battle() {
  const [playerOne, setPlayerOne] = useState<string | null>(null);
  const [playerTwo, setPlayerTwo] = useState<string | null>(null);

  const handleSubmit = (id: string, username: string) => {
    id === "playerOne" ? setPlayerOne(username) : setPlayerTwo(username);
  };

  const handleReset = (id: string) => {
    id === "playerOne" ? setPlayerOne(null) : setPlayerTwo(null);
  };

  return (
    <div className="">
      <Instructions />

      <div className="container">
        <h1>Players</h1>
        <div className="flex justify-between items-center">
          {playerOne === null ? (
            <PlayerInput
              label="Player One"
              onSubmit={(player) => handleSubmit("playerOne", player)}
            />
          ) : (
            <PlayerPreview
              label="Player One"
              username={playerOne}
              onReset={() => handleReset("playerOne")}
            />
          )}
          {playerTwo === null ? (
            <PlayerInput
              label="Player One"
              onSubmit={(player) => handleSubmit("playerTwo", player)}
            />
          ) : (
            <PlayerPreview
              label="Player One"
              username={playerTwo}
              onReset={() => handleReset("playerTwo")}
            />
          )}
        </div>

        {playerOne && playerTwo && (
          <Link
            to={{
              pathname: "/battle/results",
              search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`,
            }}
          >
            Battle
          </Link>
        )}
      </div>
    </div>
  );
}
