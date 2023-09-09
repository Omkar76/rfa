import { FC } from "react";
import { TextFieldData } from "../types/forms";

export interface PreviewTextFieldProps {
  field: TextFieldData;
  setAnswer: (answer: string) => void;
}

export const PreviewTextField: FC<PreviewTextFieldProps> = ({
  field,
  setAnswer,
}) => {
  return (
    <div className="flex items-center gap-2">
      <label>
        {" "}
        {field.label}
        <input
          required
          value={field.value}
          onChange={(e) => setAnswer(e.target.value)}
          type={field.type}
          className="focus:border-blue-300 border-2 border-gray-300 p-2 w-full my-1 bg-slate-100 outline-none rounded-sm"
        />
      </label>
    </div>
  );
};
