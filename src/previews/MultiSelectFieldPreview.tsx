import { FC, useState } from "react";
import { MultiSelectFieldData } from "../types/forms";

export interface MultiSelectFieldPreviewProps {
  field: MultiSelectFieldData;
  setField: (field: MultiSelectFieldData) => void;
}

export const PreviewMultiSelect: FC<MultiSelectFieldPreviewProps> = ({
  field,
  setField,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const addValue = (v: string) => {
    setField({ ...field, value: [...field.value, v] });
  };

  const deleteValue = (v: string) => {
    setField({ ...field, value: field.value.filter((option) => option !== v) });
  };

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
          {field.options.map((option) => {
            return (
              <label>
                <input
                  name={field.id.toString()}
                  onChange={(e) =>
                    e.target.checked ? addValue(option) : deleteValue(option)
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
