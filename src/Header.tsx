import { FC } from "react";
// import tailwindLogo from "./images/tailwind.svg";
import reactLogo from "./images/react.svg";
import { ActiveLink } from "raviger";

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <>
      <div className="flex flex-row gap-1 items-center justify-between w-full mb-5">
        <div className="flex items-center">
          <img src={reactLogo} alt="React logo" className="w-16 h-16" />

          <h1 className="text-xl text-center font-bold text-gray-800 flex-grow-[1]">
            {title}
          </h1>
          {/* <img src={tailwindLogo} alt="Tailwind logo" className="ml-4 w-11 h-11" /> */}
        </div>
        <nav className="flex gap-4 text-xl ml-auto mr-5">
          <ActiveLink exactActiveClass="text-blue-400" href="/">
            Home
          </ActiveLink>
          <ActiveLink exactActiveClass="text-blue-400" href="/about">
            About
          </ActiveLink>
        </nav>
      </div>
    </>
  );
};

export default Header;
