import { FC, useState } from "react";
import { RadioFieldData } from "../types/forms";

export interface RadioFieldProps {
  fieldData: RadioFieldData;
  updateLabel: (label: string) => void;
  addOption: (option: string) => void;
  deleteOption: (index: number) => void;
  updateOption: (index: number, option: string) => void;
}

export const RadioField: FC<RadioFieldProps> = ({
  fieldData,
  updateLabel,
  deleteOption,
  addOption,
  updateOption,
}) => {
  const [option, setOption] = useState("");

  return (
    <>
      <div className="flex flex-col w-full items-center gap-2">
        <input
          required
          value={fieldData.label}
          onChange={(e) => updateLabel(e.target.value)}
          className="w-full focus:border-blue-300 border-2 border-gray-300 p-2 my-1 bg-slate-100 outline-none rounded-sm"
        />
        <div className="flex items-stretch w-full border p-2">
          <div className="w-full">
            <span className="font-extrabold min-w-[300px]">Options:</span>
            {fieldData.options.map((option, index) => {
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
