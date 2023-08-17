import { FC, HTMLInputTypeAttribute, useEffect, useRef, useState } from "react";
import { FormField } from "./FormField";

const LOCAL_FORMS_KEY = "LOCAL_FORMS_KEY_V1";

interface FormProps {
  closeForm: () => void;
}

interface FormFieldData {
  id: number;
  label: string;
  type?: HTMLInputTypeAttribute;
  value: string;
}

interface FormData {
  id: number;
  title: string;
  fields: FormFieldData[];
}

const initialFormFields: FormFieldData[] = [
  { id: 1, label: "First Name", value: "" },
  { id: 2, label: "Last Name", value: "" },
  { id: 3, label: "Email", type: "email", value: "" },
  { id: 4, label: "Date of Birth", type: "date", value: "" },
  { id: 5, label: "Phone number", type: "tel", value: "" },
];

function getLocalForms(): FormData[] {
  const savedFormsJSON = localStorage.getItem(LOCAL_FORMS_KEY);
  return savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
}

function saveLocalForms(forms: FormData[]) {
  localStorage.setItem(LOCAL_FORMS_KEY, JSON.stringify(forms));
}

function initialState(): FormData {
  const localForms = getLocalForms();

  if (localForms.length > 0) {
    return localForms[0];
  }

  const newForm = {
    id: new Date().getTime(),
    title: "Untitled Form",
    fields: initialFormFields,
  };

  saveLocalForms([newForm]);
  return newForm;
}

function saveFormData(currentFormState: FormData) {
  const localForms = getLocalForms();
  const updatedLocalForms = localForms.map((form) =>
    form.id === currentFormState.id ? currentFormState : form
  );

  saveLocalForms(updatedLocalForms);
  console.log("State saved to localStorage");
}

export const Form: FC<FormProps> = ({ closeForm }) => {
  const [formData, setFormData] = useState(() => initialState());
  const [newFieldLabel, setNewFieldLabel] = useState("");
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
          type: "text",
          value: "",
        },
      ],
    });

    setNewFieldLabel("");
  };

  const removeField = (id: number) => {
    setFormData({
      ...formData,
      fields: formData.fields.filter((field) => field.id !== id),
    });
  };

  const updateField = (id: number, value: any) => {
    setFormData({
      ...formData,
      fields: formData.fields.map((field) => {
        if (field.id !== id) {
          return field;
        }

        return {
          ...field,
          value,
        };
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
          label={field.label}
          type={field.type}
          value={field.value}
          removField={removeField.bind(null, field.id)}
          updateField={updateField.bind(null, field.id)}
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
        <button
          className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md ml-auto"
          onClick={closeForm}
        >
          Close Form
        </button>
      </div>
    </form>
  );
};
