import { FC, useEffect, useState } from "react";
import { MultiSelectFieldData } from "../types/forms";

export interface MultiSelectFieldPreviewProps {
  field: MultiSelectFieldData;
  setAnswer: (answer: string) => void;
}

export const PreviewMultiSelect: FC<MultiSelectFieldPreviewProps> = ({
  field,
  setAnswer,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    field.value.split(",").filter(Boolean),
  );

  const addAnswer = (option: string) => {
    setSelectedOptions((current) => {
      const newOptions = [...current, option];
      return newOptions;
    });
  };

  const deleteAnswer = (option: string) => {
    setSelectedOptions((current) => {
      const newOptions = current.filter((o) => o !== option);
      return newOptions;
    });
  };

  useEffect(() => {
    setAnswer(selectedOptions.join(","));
  }, [selectedOptions, setAnswer]);

  return (
    <div className="flex flex-col items-center gap-2">
      <b>{field.label}</b>

      <div
        className="border min-w-[100px] min-h-[25px] p-2"
        onClick={() => setShowOptions((current) => !current)}
      >
        {field.value.length === 0 && "select options"}

        {field.value}
      </div>

      <div
        className={"flex flex-col border p-2" + (showOptions ? "" : " hidden")}
      >
        {field.options.map((option, index) => {
          return (
            <label key={index}>
              <input
                required
                name={field.id.toString()}
                onChange={(e) =>
                  e.target.checked ? addAnswer(option) : deleteAnswer(option)
                }
                type="checkbox"
                checked={!!selectedOptions.find((o) => o === option)}
              />{" "}
              {option}
            </label>
          );
        })}
      </div>
    </div>
  );
};
