import { FormEvent, useState } from "react";

type PlayerInputProps = {
  onSubmit: (username: string) => void;
  label: string;
};

export function PlayerInput({ onSubmit, label }: PlayerInputProps) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    onSubmit(username);
  };

  const handleChange = (e: FormEvent<HTMLInputElement>): void => {
    setUsername(e.currentTarget.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full m-5">
      <label htmlFor="username">{label}</label>
      <div className="flex justify-center items-baseline space-x-2">
        <input
          type="text"
          id="username"
          placeholder="github username"
          value={username}
          onChange={handleChange}
        />
        <button type="submit" disabled={!username} className="btn">
          Submit
        </button>
      </div>
    </form>
  );
}
