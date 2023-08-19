import { FC } from "react";
import tailwindLogo from "./images/tailwind.svg";
import reactLogo from "./images/react.svg";

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <div className="flex gap-1 items-center justify-center">
      <img src={tailwindLogo} alt="Tailwind logo" className="w-16 h-16" />

      <h1 className="text-xl text-center font-bold text-gray-800 flex-grow-[1]">
        {title}
      </h1>
      <img src={reactLogo} alt="React logo" className="w-16 h-16" />
    </div>
  );
};

export default Header;
