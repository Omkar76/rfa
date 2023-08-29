import { FC } from "react";
import { TextFieldData } from "../types/forms";

export interface PreviewTextFieldProps {
  field: TextFieldData;
  setField: (field: TextFieldData) => void;
}

export const PreviewTextField: FC<PreviewTextFieldProps> = ({
  field,
  setField,
}) => {
  return (
    <div className="flex items-center gap-2">
      <label>
        {" "}
        {field.label}
        <input
          required
          value={field.value}
          onChange={(e) => setField({ ...field, value: e.target.value })}
          type={field.type}
          className="focus:border-blue-300 border-2 border-gray-300 p-2 w-full my-1 bg-slate-100 outline-none rounded-sm"
        />
      </label>
    </div>
  );
};
