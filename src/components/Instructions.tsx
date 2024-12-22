import { useContext } from "react";
import {
  FaUserFriends,
  FaFighterJet,
  FaTrophy,
  FaTimesCircle,
} from "react-icons/fa";
import { ThemeContext } from "../contexts/theme";

export function Instructions() {
  const theme = useContext(ThemeContext);

  return (
    <div className="container mx-auto">
      <h1 className="text-center">Instructions</h1>
      <ul className="flex flex-wrap justify-evenly my-4 text-center">
        <li className="flex flex-col items-center space-y-2">
          <h3>Enter two Github users</h3>
          <FaUserFriends className="bg-orange-600 p-10" size={200} />
        </li>
        <li className="flex flex-col items-center space-y-2">
          <h3>Battle</h3>
          <FaFighterJet className="bg-orange-400 p-10" size={200} />
        </li>
        <li className="flex flex-col items-center space-y-2">
          <h3>See the winners</h3>
          <FaTrophy className="bg-yellow-400 p-10" size={200} />
        </li>
      </ul>
    </div>
  );
}
