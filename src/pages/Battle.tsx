import { useState } from "react";
import { Instructions } from "../components/Instructions.tsx";
import { PlayerInput } from "../components/PlayerInput.tsx";
import { PlayerPreview } from "../components/PlayerPreview.tsx";
import { Link } from "react-router";

export default function Battle() {
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

      <div className="container mx-auto">
        <h1 className="text-center">Players</h1>
        <div className="flex flex-flex-wrap justify-between items-center space-x-10">
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
              label="Player Two"
              onSubmit={(player) => handleSubmit("playerTwo", player)}
            />
          ) : (
            <PlayerPreview
              label="Player Two"
              username={playerTwo}
              onReset={() => handleReset("playerTwo")}
            />
          )}
        </div>

        <div className="flex items-center w-full mx-auto">
          {playerOne && playerTwo && (
            <Link
              to={{
                pathname: "/battle/results",
                search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`,
              }}
              className="btn mx-auto text-center"
            >
              Battle
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
