import { useEffect, useReducer } from "react";
import { Link } from "react-router";
import { Card } from "../components/Card.tsx";
import { BattleResultUser } from "../utils/types.tsx";
import { ProfileItems } from "../components/ProfileItems.tsx";
import { battle } from "../utils/api.tsx";
import { Loading } from "../components/Loading.tsx";

interface BattleState {
  winner: BattleResultUser | null;
  loser: BattleResultUser | null;
  error?: string | null;
  loading?: boolean;
}

type BattleActionType =
  | {
      type: "success";
      payload: {
        winner: BattleResultUser;
        loser: BattleResultUser;
        error?: null;
        loading?: false;
      };
    }
  | {
      type: "error";
      payload: { error: Error; loading?: false };
    };

function battleReducer(state: BattleState, action: BattleActionType) {
  switch (action.type) {
    case "success": {
      return {
        ...state,
        winner: action.payload.winner,
        loser: action.payload.loser,
        error: null,
        loading: false,
      };
    }
    case "error": {
      return {
        ...state,
        error: action.payload.error.message,
        loading: false,
      };
    }

    default:
      throw new Error(`The action type is not supported.`);
  }
}

export default function Results() {
  const searchParams = new URLSearchParams(window.location.search);

  const playerOne = searchParams.get("playerOne") as string;
  const playerTwo = searchParams.get("playerTwo") as string;

  const [state, dispatch] = useReducer(battleReducer, {
    winner: null,
    loser: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    battle([playerOne, playerTwo])
      .then((players) => {
        if (players) {
          dispatch({
            type: "success",
            payload: {
              winner: players[0],
              loser: players[1],
            },
          });
        }
      })
      .catch((error) => dispatch({ type: "error", payload: { error } }));
  }, [playerOne, playerTwo]);

  const { winner, loser, error, loading } = state;

  if (loading === true) {
    return <Loading text="Battling" />;
  }

  if (error) {
    return <p className="text-center">{error}</p>;
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-around items-center">
        {winner && loser && (
          <Card
            header={winner.score === loser.score ? "Tie" : "Winner"}
            subheader={`Score: ${winner.score.toLocaleString()}`}
            avatar={winner.user.avatar_url}
            href={winner.user.html_url}
            name={winner.user.login}
          >
            <ProfileItems user={winner.user} />
          </Card>
        )}

        {winner && loser && (
          <Card
            header={winner.score === loser.score ? "Tie" : "Loser"}
            subheader={`Score: ${loser.score.toLocaleString()}`}
            avatar={loser.user.avatar_url}
            href={loser.user.html_url}
            name={loser.user.login}
          >
            <ProfileItems user={loser.user} />
          </Card>
        )}
      </div>
      <div className="flex items-center w-full mx-auto">
        <Link to={"/battle"} className="btn mx-auto text-center">
          Reset
        </Link>
      </div>
    </div>
  );
}
