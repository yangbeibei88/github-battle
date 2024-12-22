import {
  FaBriefcase,
  FaCode,
  FaCompass,
  FaUser,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import { User } from "../utils/types.tsx";

export function ProfileItems(user: User) {
  return (
    <ul>
      <li>
        <FaUser className="text-rose-500" size={22} />
        {user.name}
      </li>
      {user.location && (
        <li>
          <FaCompass className="text-purple-500" size={22} />
        </li>
      )}
      {user.company && <FaBriefcase className="text-orange-500" size={22} />}
      <li>
        <FaUsers className="text-blue-500" size={22} />
        {user.followers} followers
      </li>
      <li>
        <FaUserFriends className="text-green-500" size={22} />
        {user.following} follwing
      </li>
      <li>
        <FaCode className="text-slate-500" size={22} />
        {user.public_repos}
      </li>
    </ul>
  );
}
