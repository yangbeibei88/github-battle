import React, { useContext } from "react";
import { ThemeContext } from "../contexts/theme.tsx";

type CardProps = {
  header: string;
  avatar: string;
  href: string;
  name: string;
  children: React.ReactNode;
};

export function Card({ header, avatar, href, name, children }: CardProps) {
  const theme = useContext(ThemeContext);
  return (
    <div
      className={`my-3 p-4 w-60 rounded ${
        theme === "light" ? "bg-slate-300" : "bg-slate-700"
      } `}
    >
      <h4 className="text-lg">{header}</h4>
      <a href={href}>
        <img src={avatar} alt={name} />
      </a>
      <h2 className="text-center">
        <a href={href}>{name}</a>
      </h2>
      {children}
    </div>
  );
}
