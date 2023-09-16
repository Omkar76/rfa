import { FC } from "react";
import reactLogo from "./images/react.svg";
import { ActiveLink } from "raviger";
import { useUserContext } from "./context/userContext";

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  const { user } = useUserContext();

  return (
    <>
      <div className="flex flex-row gap-1 items-center justify-between w-full mb-5">
        <div className="flex items-center">
          <img src={reactLogo} alt="React logo" className="w-16 h-16" />

          <h1 className="text-xl text-center font-bold text-gray-800 flex-grow-[1]">
            {title}
          </h1>
        </div>
        <nav className="flex gap-4 text-xl ml-auto mr-5">
          <ActiveLink exactActiveClass="text-blue-400" href="/">
            Home
          </ActiveLink>
          <ActiveLink exactActiveClass="text-blue-400" href="/about">
            About
          </ActiveLink>
          {!user && (
            <ActiveLink exactActiveClass="text-blue-400" href="/login">
              Login
            </ActiveLink>
          )}

          {user && (
            <button
              className="text-red-600 border"
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </>
  );
};

export default Header;
