import { FC, useEffect, useRef, useState } from "react";
import { FormField } from "../inputs/FormField";
import { Link } from "raviger";
import { getFormById, getDefaultFormData, saveFormData } from "../utils/forms";
import {
  FormData,
  FormFieldData,
  HTMLInputTypeAttributeValues,
  fieldType,
} from "../types/forms";
import { MultiSelectField } from "../inputs/MultiSelectFormField";
import { RadioField } from "../inputs/RadioFormField";

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
    switch (newFieldType) {
      case "multiselect":
        setFormData({
          ...formData,
          fields: [
            ...formData.fields,
            {
              kind: "multiselect",
              options: [],
              id: +new Date(),
              label: newFieldLabel,
              value: [],
            },
          ],
        });

        break;

      case "radio":
        setFormData({
          ...formData,
          fields: [
            ...formData.fields,
            {
              kind: "radio",
              options: [],
              id: +new Date(),
              label: newFieldLabel,
              value: "",
            },
          ],
        });
        break;

      default:
        setFormData({
          ...formData,
          fields: [
            ...formData.fields,
            {
              kind: "text",
              id: +new Date(),
              label: newFieldLabel,
              type: newFieldType,
              value: "",
            },
          ],
        });
    }

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
        switch (field.kind) {
          case "multiselect":
            return { ...field, value: [] };
          default:
            return { ...field, value: "" };
        }
      }),
    });
  };

  const renderField = (field: FormFieldData) => {
    switch (field.kind) {
      case "text":
        return (
          <FormField
            key={field.id}
            fieldData={field}
            setField={setField.bind(null, field.id)}
            removField={removeField.bind(null, field.id)}
          />
        );
      case "multiselect":
        return (
          <MultiSelectField
            key={field.id}
            fieldData={field}
            setField={setField.bind(null, field.id)}
          />
        );

      case "radio":
        return (
          <RadioField
            key={field.id}
            fieldData={field}
            setField={setField.bind(null, field.id)}
          />
        );

      default:
        return <></>;
    }
  };

  const setFieldType = (field: FormFieldData, type: fieldType) => {
    switch (type) {
      case "multiselect":
        setField(field.id, {
          ...field,
          kind: "multiselect",
          options: [],
          value: [],
        });
        break;

      case "radio":
        setField(field.id, { ...field, kind: "radio", options: [], value: "" });
        break;
      default:
        setField(field.id, { ...field, kind: "text", type: type, value: "" });
        break;
    }
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
          <div className="flex items-center gap-2">
            {renderField(field)}
            <select
              className="p-3"
              onChange={(e) => {
                setFieldType(field, e.target.value as fieldType);
              }}
            >
              {HTMLInputTypeAttributeValues.map((type) => {
                let selected = false;
                switch(field.kind){
                  case "text":
                    selected = type === field.type;
                  break;
                  case "radio":
                    selected = type === "radio";
                    break;
                  case "multiselect":
                    selected = type === "multiselect";
                }
               return <option value={type} selected={selected}>{type.toUpperCase()} </option>
              })}
            </select>

            <svg
              onClick={() => removeField(field.id)}
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 fill-red-600"
            >
              <title>Click to remove "{field.label}" field</title>
              <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
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
