import { MouseEventHandler } from "react";
import { FaTimesCircle } from "react-icons/fa";

type PlayerPreviewProps = {
  username: string;
  label: string;
  onReset: MouseEventHandler<HTMLButtonElement>;
};

export function PlayerPreview({
  username,
  onReset,
  label,
}: PlayerPreviewProps) {
  return (
    <div className="flex flex-col w-full m-5">
      <label>{label}</label>
      <div className="flex justify-between bg-slate-100 p-2">
        <div className="player-info flex items-center space-x-3">
          <img
            src={`https://github.com/${username}.png?size=200`}
            alt={username}
            className="rounded-full w-14"
          />
          <a
            href={`https://api.github.com/users/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold"
          >
            {username}
          </a>
        </div>
        <button type="button" onClick={onReset}>
          <FaTimesCircle className="text-red-500" size={26} />
        </button>
      </div>
    </div>
  );
}
