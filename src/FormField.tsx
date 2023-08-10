import { FC } from "react";

interface FormFieldProps {
  label: string;
  type?: string;
}

export const FormField: FC<FormFieldProps> = ({ label, type }) => {
  return (
    <>
      <label>{label}</label>
      <input
        required
        type={type}
        className="focus:border-blue-300 block border-2 border-gray-300 p-2 w-full mb-2 bg-slate-100 outline-none rounded-sm"
      />
    </>
  );
};
