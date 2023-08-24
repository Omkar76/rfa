import { FC } from "react";
import { FormList } from "../FormLists";

interface FormProps {}

export const Home: FC<FormProps> = () => {
  return (
    <>
      <h1 className="text-xl text-center">Welcome to my home page</h1>

      <FormList />
    </>
  );
};
