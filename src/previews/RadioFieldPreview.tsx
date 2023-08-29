import { FC, useState } from "react";
import { RadioFieldData } from "../types/forms";

export interface RadioFieldPreviewProps {
  field: RadioFieldData;
  setField: (field: RadioFieldData) => void;
}

export const PreviewRadio: FC<RadioFieldPreviewProps> = ({
  field,
  setField,
}) => {
  // const [showOptions, setShowOptions] = useState(false);

  const setValue = (v: string) => {
    setField({ ...field, value: v });
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <b>{field.label}</b>
      {/* onClick={() => setShowOptions((current) => !current)} */}
      <div className="border min-w-[100px] min-h-[25px] p-2">{field.value}</div>

      {/* {showOptions && */}
      <div className="flex flex-col border p-2">
        {field.options.map((option) => {
          return (
            <label>
              <input
                name={field.id.toString()}
                onChange={(e) => e.target.checked && setValue(option)}
                type="radio"
                defaultChecked={!!(field.value === option)}
                // value={option}
              />{" "}
              {option}
            </label>
          );
        })}
      </div>
    </div>
  );
};
