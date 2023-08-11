import { FC } from "react";
import logo from "./logo.svg";

interface FormProps {
  openForm: () => void;
}

export const Home: FC<FormProps> = ({ openForm }) => {
  return (
    <>
      <div className="">
        <img src={logo} alt="React Logo" />
        <h1 className="text-xl text-center">Welcome to my home page</h1>
      </div>
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
