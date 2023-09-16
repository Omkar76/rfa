import { FC, useState } from "react";
import { MultiSelectFieldData } from "../types/forms";

export interface MultiSelectFieldProps {
  fieldData: MultiSelectFieldData;
  updateOptions: (options: string[]) => void;
}

export const MultiSelectField: FC<MultiSelectFieldProps> = ({
  fieldData,
  updateOptions,
}) => {
  const [options, setOptions] = useState(fieldData.options);
  const [option, setOption] = useState("");

  const deleteOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    updateOptions(newOptions);
  };

  const addOption = (option: string) => {
    const newOptions = [...options, option];
    setOptions(newOptions);
    updateOptions(newOptions);
  };
  return (
    <>
      <div className="flex flex-col w-full items-center gap-2">
        <span className="w-full focus:border-blue-300 border-2 border-gray-300 p-2 my-1 bg-slate-100 outline-none rounded-sm">
          {fieldData.label}
        </span>
        <div className="flex items-stretch w-full border p-2">
          <div className="w-full">
            <span className="font-extrabold min-w-[300px]">Options:</span>
            {options.map((option, index) => {
              return (
                <div
                  key={index}
                  className="flex gap-2 w-full justify-between border p-2"
                >
                  <span>{option}</span>

                  <svg
                    onClick={() => deleteOption(index)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="text-red-500 w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              );
            })}

            <input
              className="p-2 border-2"
              placeholder="Add option"
              value={option}
              onChange={(e) => setOption(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  addOption(option);
                  setOption("");
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
