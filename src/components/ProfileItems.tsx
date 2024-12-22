import {
  FaBriefcase,
  FaCode,
  FaCompass,
  FaUser,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import { User } from "../utils/types.tsx";

export function ProfileItems({ user }: { user: User }) {
  return (
    <ul className="flex flex-col gap-1">
      <li className="flex items-center space-x-4">
        <FaUser className="text-rose-500" size={22} />
        <span>{user.name}</span>
      </li>
      {user.location && (
        <li className="flex items-center space-x-4">
          <FaCompass className="text-purple-500" size={22} />
          <span>{user.location}</span>
        </li>
      )}
      {user.company && <FaBriefcase className="text-orange-500" size={22} />}
      <li className="flex items-center space-x-4">
        <FaUsers className="text-blue-500" size={22} />
        <span>{user.followers} followers</span>
      </li>
      <li className="flex items-center space-x-4">
        <FaUserFriends className="text-green-500" size={22} />
        <span>{user.following} following</span>
      </li>
      <li className="flex items-center space-x-4">
        <FaCode className="text-slate-500" size={22} />
        <span>{user.public_repos} repositories</span>
      </li>
    </ul>
  );
}
