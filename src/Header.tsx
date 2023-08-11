import { FC } from "react";
import logo from "./logo.svg";

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <div className="flex gap-1 items-center">
      <img
        src={logo}
        alt="React Logo"
        className="h-16 w-16 animate-spin"
        style={{ animation: "spin 2s linear infinite" }}
      />

      <h1 className="text-xl text-center font-bold text-gray-800">{title}</h1>
    </div>
  );
};

export default Header;
