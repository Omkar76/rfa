import { FC } from "react";
import { FormFieldData } from "../types/forms";

export interface FormFieldProps {
  fieldData: FormFieldData;
}

export const FormField: FC<FormFieldProps> = ({ fieldData }) => {
  return (
    <>
      <span className="focus:border-blue-300 border-2 border-gray-300 p-2 w-full my-1 bg-slate-100 outline-none rounded-sm">
        {fieldData.label}
      </span>
    </>
  );
};
