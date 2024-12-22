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
    <div className="">
      <h3>{label}</h3>
      <div className="flex justify-between">
        <div className="player-info">
          <img
            src={`https://github.com/${username}.png?size=200`}
            alt={username}
            width={200}
            height={200}
          />
          <a
            href={`https://api.github.com/users/${username}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {username}
          </a>
        </div>
        <button type="button" onClick={onReset}>
          <FaTimesCircle color="text-sky-700" size={26} />
        </button>
      </div>
    </div>
  );
}
