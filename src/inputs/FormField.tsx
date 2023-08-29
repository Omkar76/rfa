import { FC } from "react";
import { TextFieldData } from "../types/forms";

export interface FormFieldProps {
  fieldData: TextFieldData;
  removField: () => void;
  setField: (field: TextFieldData) => void;
}

export const FormField: FC<FormFieldProps> = ({
  fieldData,
  removField,
  setField,
}) => {
  return (
    <>
      <input
        required
        value={fieldData.label}
        onChange={(e) => setField({ ...fieldData, label: e.target.value })}
        type={fieldData.type}
        className="focus:border-blue-300 border-2 border-gray-300 p-2 w-full my-1 bg-slate-100 outline-none rounded-sm"
      />
    </>
  );
};
