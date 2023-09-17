import { FC } from "react";
import { RadioFieldData } from "../types/forms";

export interface RadioFieldPreviewProps {
  field: RadioFieldData;
  setAnswer: (answer: string) => void;
}

export const PreviewRadio: FC<RadioFieldPreviewProps> = ({
  field,
  setAnswer,
}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <b>{field.label}</b>
      <div className="border min-w-[100px] min-h-[25px] p-2">{field.value}</div>

      <div className="flex flex-col border p-2">
        {field.options.map((option, index) => {
          return (
            <label key={index}>
              <input
                required
                name={field.id.toString()}
                onChange={(e) => e.target.checked && setAnswer(option)}
                type="radio"
                defaultChecked={!!(field.value === option)}
              />{" "}
              {option}
            </label>
          );
        })}
      </div>
    </div>
  );
};
