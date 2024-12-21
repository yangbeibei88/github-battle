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
      <h1>Instructions</h1>
      <ul className="flex justify-between items-center">
        <li>
          <h3>Enter two Github users</h3>
          <FaUserFriends className="bg-orange-600" size={140} />
        </li>
        <li>
          <h3>Battle</h3>
          <FaFighterJet className="bg-orange-400" size={140} />
        </li>
        <li>
          <h3>See the winners</h3>
          <FaTrophy className="bg-yellow-400" size={140} />
        </li>
      </ul>
    </div>
  );
}
