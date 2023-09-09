import { FC, useState } from "react";
import { MultiSelectFieldData } from "../types/forms";

export interface MultiSelectFieldPreviewProps {
  field: MultiSelectFieldData;
  addAnswer: (answer: string) => void;
  deleteAnswer: (answer: string) => void;
}

export const PreviewMultiSelect: FC<MultiSelectFieldPreviewProps> = ({
  field,
  addAnswer,
  deleteAnswer,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="flex flex-col items-center gap-2">
      <b>{field.label}</b>

      <div
        className="border min-w-[100px] min-h-[25px] p-2"
        onClick={() => setShowOptions((current) => !current)}
      >
        {field.value.length === 0 && "select options"}

        {field.value.join(", ")}
      </div>

      {showOptions && (
        <div className="flex flex-col border p-2">
          {field.options.map((option, index) => {
            return (
              <label key={index}>
                <input
                  name={field.id.toString()}
                  onChange={(e) =>
                    e.target.checked ? addAnswer(option) : deleteAnswer(option)
                  }
                  type="checkbox"
                  defaultChecked={!!field.value.find((o) => o === option)}
                  // value={option}
                />{" "}
                {option}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};
