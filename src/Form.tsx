import { FC, FormEventHandler, useState } from "react";
import { FormField } from "./FormField";

interface FormProps {
  closeForm: () => void;
}

const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
  event.preventDefault();
  (event.target as HTMLFormElement).reset();
  alert("Data submitted.");
};

const defaultFields = [
  { id: 1, label: "First Name" },
  { id: 2, label: "Last Name" },
  { id: 3, label: "Email", type: "email" },
  { id: 4, label: "Date of Birth", type: "date" },
  { id: 5, label: "Phone number", type: "tel" },
];

export const Form: FC<FormProps> = ({ closeForm }) => {
  const [fields, setFields] = useState(defaultFields);
  const [newFieldLabel, setNewFieldLabel] = useState("");

  const addField = () => {
    setFields([
      ...fields,
      {
        id: +new Date(),
        label: newFieldLabel,
        type: "text",
      },
    ]);

    setNewFieldLabel("");
  };

  const removeField = (id: number) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  return (
    <form onSubmit={onSubmit}>
      {fields.map((field) => (
        <FormField
          key={field.id}
          label={field.label}
          type={field.type}
          onRemoveClicked={() => removeField(field.id)}
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
          type="submit"
        >
          Submit
        </button>

        <button
          className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
          onClick={closeForm}
        >
          Close Form
        </button>
      </div>
    </form>
  );
};
