import { FC } from "react";
import reactLogo from "./images/react.svg";

interface FormProps {
  openForm: () => void;
}

export const Home: FC<FormProps> = ({ openForm }) => {
  return (
    <>
      {/* <img
        src={reactLogo}
        alt="React Logo"
        className="h-64 w-64 animate-spin"
        style={{ animation: "spin 2s linear infinite" }}
      /> */}
      <h1 className="text-xl text-center">Welcome to my home page</h1>
      <button
        onClick={openForm}
        className="w-full p-2 mt-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
        type="submit"
      >
        Open Form
      </button>
    </>
  );
};
