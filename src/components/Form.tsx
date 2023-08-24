import { FC, useEffect, useRef, useState } from "react";
import { FormField, HTMLInputTypeAttributeValues } from "../FormField";
import { Link } from "raviger";
import { getFormById, getDefaultFormData, saveFormData } from "../utils/forms";
import { FormData, FormFieldData } from "../types/forms";

export interface FormProps {
  formID: number;
}

function initialState(formID: number): FormData {
  const form = getFormById(formID);

  return form || getDefaultFormData();
}

export const Form: FC<FormProps> = ({ formID }) => {
  const [formData, setFormData] = useState(() => initialState(formID));
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldType, setNewFieldType] = useState("text");
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const oldTitle = document.title;
    document.title = "Form Editor";

    titleRef.current?.focus();
    return () => {
      document.title = oldTitle;
    };
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      saveFormData(formData);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [formData]);

  const addField = () => {
    setFormData({
      ...formData,
      fields: [
        ...formData.fields,
        {
          id: +new Date(),
          label: newFieldLabel,
          type: newFieldType,
          value: "",
        },
      ],
    });

    setNewFieldLabel("");
    setNewFieldType("text");
  };

  const removeField = (id: number) => {
    setFormData({
      ...formData,
      fields: formData.fields.filter((field) => field.id !== id),
    });
  };

  const setField = (id: number, updatedFieldData: FormFieldData) => {
    setFormData({
      ...formData,
      fields: formData.fields.map((field) => {
        if (field.id !== id) {
          return field;
        }

        return updatedFieldData;
      }),
    });
  };

  const clearFields = () => {
    setFormData({
      ...formData,
      fields: formData.fields.map((field) => {
        return { ...field, value: "" };
      }),
    });
  };

  return (
    <div className="w-full">
      <form>
        <input
          ref={titleRef}
          value={formData.title}
          onChange={(e) => {
            setFormData({ ...formData, title: e.target.value });
          }}
          className="focus:border-blue-300 border-2 border-gray-300 p-2 w-full my-1 bg-slate-100 outline-none rounded-sm"
        />

        {formData.fields.map((field) => (
          <FormField
            key={field.id}
            fieldData={field}
            setField={setField.bind(null, field.id)}
            removField={removeField.bind(null, field.id)}
          />
        ))}

        <div className="flex items-center gap-2 border-y-2 py-2 mt-2">
          <input
            placeholder="Untited Field"
            value={newFieldLabel}
            onChange={(e) => setNewFieldLabel(e.target.value)}
            type="text"
            className="focus:border-blue-300 border-2 border-gray-300 p-2 w-full bg-slate-100 outline-none rounded-sm"
          />

          <select
            className="p-3"
            onChange={(e) => {
              setNewFieldType(e.target.value);
            }}
          >
            {HTMLInputTypeAttributeValues.map((type) => (
              <option value={type}>{type.toUpperCase()}</option>
            ))}
          </select>
          <svg
            onClick={addField}
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 fill-blue-600"
          >
            <title>Click to add new field</title>
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex flex-row gap-2 justify-start mt-4">
          <button
            className="p-2 bg-blue-500 hover:bg-blue-60 text-white rounded-md"
            onClick={(e) => {
              e.preventDefault();
              saveFormData(formData);
            }}
          >
            Save
          </button>
          <button
            className="p-2 bg-white hover:bg-blue-60 text-black rounded-md border-2 border-black"
            onClick={(e) => {
              e.preventDefault();
              clearFields();
            }}
          >
            Clear Fields
          </button>
          <Link href="/">
            <button className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md ml-auto">
              Close Form
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};
